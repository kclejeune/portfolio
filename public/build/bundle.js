
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.32.3' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/Skills.svelte generated by Svelte v3.32.3 */

    const file = "src/Skills.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (29:6) {#each skills as skill}
    function create_each_block(ctx) {
    	let div1;
    	let div0;
    	let h2;
    	let t0_value = /*skill*/ ctx[2] + "";
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(h2, "class", "header");
    			add_location(h2, file, 31, 12, 686);
    			attr_dev(div0, "class", "card-body");
    			add_location(div0, file, 30, 10, 650);
    			attr_dev(div1, "class", "m-2 card wow zoomIn");
    			add_location(div1, file, 29, 8, 606);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h2);
    			append_dev(h2, t0);
    			append_dev(div1, t1);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(29:6) {#each skills as skill}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let span;
    	let t0;
    	let div2;
    	let div1;
    	let h1;
    	let t2;
    	let div0;
    	let each_value = /*skills*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = space();
    			div2 = element("div");
    			div1 = element("div");
    			h1 = element("h1");
    			h1.textContent = `${/*title*/ ctx[0]}`;
    			t2 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(span, "class", "anchor bg-dark");
    			attr_dev(span, "id", "technologies");
    			add_location(span, file, 23, 0, 350);
    			attr_dev(h1, "class", "header pt-3 text-light");
    			add_location(h1, file, 26, 4, 470);
    			attr_dev(div0, "class", "py-3 wow fadeIn text-dark cards");
    			add_location(div0, file, 27, 4, 522);
    			attr_dev(div1, "class", "container");
    			add_location(div1, file, 25, 2, 442);
    			attr_dev(div2, "class", "technologies page bg-dark");
    			add_location(div2, file, 24, 0, 400);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, h1);
    			append_dev(div1, t2);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*skills*/ 2) {
    				each_value = /*skills*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Skills", slots, []);
    	const title = "Technologies I Use";

    	const skills = [
    		"Python",
    		"Scikit-Learn",
    		"Tensorflow",
    		"Keras",
    		"NixOS",
    		"Bash",
    		"Awk",
    		"TypeScript",
    		"Javascript",
    		"Angular",
    		"Vue",
    		"Svelte",
    		"HTML",
    		"CSS",
    		"Java",
    		"Kotlin",
    		"SQL",
    		"Scheme"
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Skills> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ title, skills });
    	return [title, skills];
    }

    class Skills extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { title: 0, skills: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Skills",
    			options,
    			id: create_fragment.name
    		});
    	}

    	get title() {
    		return this.$$.ctx[0];
    	}

    	set title(value) {
    		throw new Error("<Skills>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get skills() {
    		return this.$$.ctx[1];
    	}

    	set skills(value) {
    		throw new Error("<Skills>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Work.svelte generated by Svelte v3.32.3 */

    const file$1 = "src/Work.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	return child_ctx;
    }

    // (85:14) {#each job.tasks as task}
    function create_each_block_1(ctx) {
    	let li;
    	let t_value = /*task*/ ctx[8] + "";
    	let t;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t = text(t_value);
    			add_location(li, file$1, 85, 16, 3941);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(85:14) {#each job.tasks as task}",
    		ctx
    	});

    	return block;
    }

    // (74:6) {#each jobs as job}
    function create_each_block$1(ctx) {
    	let div1;
    	let div0;
    	let h5;
    	let t0_value = /*job*/ ctx[5].employer + "";
    	let t0;
    	let t1;
    	let h6;
    	let t2_value = /*job*/ ctx[5].title + "";
    	let t2;
    	let t3;
    	let t4_value = /*dateToString*/ ctx[1](/*job*/ ctx[5].startDate) + "";
    	let t4;
    	let t5;
    	let t6_value = /*dateToString*/ ctx[1](/*job*/ ctx[5].endDate) + "";
    	let t6;
    	let t7;
    	let t8_value = (/*job*/ ctx[5].description ?? "") + "";
    	let t8;
    	let t9;
    	let ul;
    	let t10;
    	let each_value_1 = /*job*/ ctx[5].tasks;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			h5 = element("h5");
    			t0 = text(t0_value);
    			t1 = space();
    			h6 = element("h6");
    			t2 = text(t2_value);
    			t3 = text(", ");
    			t4 = text(t4_value);
    			t5 = text(" - ");
    			t6 = text(t6_value);
    			t7 = space();
    			t8 = text(t8_value);
    			t9 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t10 = space();
    			attr_dev(h5, "class", "card-title text-dark");
    			add_location(h5, file$1, 76, 12, 3558);
    			attr_dev(h6, "class", "card-subtitle mb-2 text-muted");
    			add_location(h6, file$1, 77, 12, 3623);
    			attr_dev(ul, "class", "card-text text-dark");
    			add_location(ul, file$1, 83, 12, 3852);
    			attr_dev(div0, "class", "card-body");
    			add_location(div0, file$1, 75, 10, 3522);
    			attr_dev(div1, "class", "card m-2 wow zoomIn");
    			add_location(div1, file$1, 74, 8, 3478);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h5);
    			append_dev(h5, t0);
    			append_dev(div0, t1);
    			append_dev(div0, h6);
    			append_dev(h6, t2);
    			append_dev(h6, t3);
    			append_dev(h6, t4);
    			append_dev(h6, t5);
    			append_dev(h6, t6);
    			append_dev(div0, t7);
    			append_dev(div0, t8);
    			append_dev(div0, t9);
    			append_dev(div0, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			append_dev(div1, t10);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*jobs*/ 4) {
    				each_value_1 = /*job*/ ctx[5].tasks;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(74:6) {#each jobs as job}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let span;
    	let t0;
    	let div2;
    	let div1;
    	let h1;
    	let t2;
    	let div0;
    	let each_value = /*jobs*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = space();
    			div2 = element("div");
    			div1 = element("div");
    			h1 = element("h1");
    			h1.textContent = `${/*title*/ ctx[0]}`;
    			t2 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(span, "class", "anchor bg-primary");
    			attr_dev(span, "id", "experience");
    			add_location(span, file$1, 68, 0, 3227);
    			attr_dev(h1, "class", "header pt-3");
    			add_location(h1, file$1, 71, 4, 3349);
    			attr_dev(div0, "class", "wow fadeIn py-3 my-auto text-dark cards");
    			add_location(div0, file$1, 72, 4, 3390);
    			attr_dev(div1, "class", "container");
    			add_location(div1, file$1, 70, 2, 3321);
    			attr_dev(div2, "class", "experience page bg-primary");
    			add_location(div2, file$1, 69, 0, 3278);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, h1);
    			append_dev(div1, t2);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*jobs, dateToString*/ 6) {
    				each_value = /*jobs*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Work", slots, []);

    	const months = [
    		"January",
    		"February",
    		"March",
    		"April",
    		"May",
    		"June",
    		"July",
    		"August",
    		"September",
    		"October",
    		"November",
    		"December"
    	];

    	const title = "Work Experience";
    	const currentDate = new Date();

    	function dateToString(date) {
    		return `${months[date.getMonth()]} ${date.getFullYear()}`;
    	}

    	const jobs = [
    		{
    			employer: "CWRU Department of Computer and Data Sciences",
    			title: "Teaching Assistant",
    			startDate: new Date(2020, 8),
    			endDate: new Date(currentDate.getFullYear(), currentDate.getMonth()),
    			description: "CSDS 391: Introduction to Artificial Intelligence, CSDS 343: Theoretical Computer Science",
    			tasks: [
    				"Designed and graded course assignments and exams",
    				"Taught supplementary lectures to reinforce course material",
    				"Hosted weekly office hours to answer questions and provide feedback on theoretical written work and programming assignments"
    			]
    		},
    		{
    			employer: "Johns Hopkins University Applied Physics Laboratory",
    			title: "Machine Learning & Software Engineering Intern",
    			startDate: new Date(2020, 3),
    			endDate: new Date(2020, 7),
    			tasks: [
    				"Designed random forest, Bayesian network, and deep learning models for viral and bacterial threat classification using Scikit-Learn, Tensorflow, and Keras",
    				"Implemented a data processing pipeline using dna2vec to perform feature extraction and dimensionality reduction from sequenced DNA",
    				"Contributed to a large scale Angular application to provide an online learing approach to automated document tagging and classification"
    			]
    		},
    		{
    			employer: "Johns Hopkins University Applied Physics Laboratory",
    			title: "Software Engineering Intern",
    			startDate: new Date(2019, 4),
    			endDate: new Date(2020, 7),
    			tasks: [
    				"Worked in a Kanban development environment to quickly and effectively produce thoroughly documented, tested software for contract sponsors",
    				"Contributed to an Android application written in Java and Kotlin to implement an attachment cache mechanism, reducing form upload time by as much as 75%",
    				"Developed a web application with spring boot backend, Angular frontend, and Selenium unit tests, utilizing an internally designed UI library to deliver Elasticsearch social media analytics"
    			]
    		},
    		{
    			employer: "Agriplex Genomics",
    			title: "Software Engineering Intern",
    			startDate: new Date(2018, 8),
    			endDate: new Date(2019, 4),
    			tasks: [
    				"Developed a job scheduling application from scratch in Angular and designed an algorithm to optimize job scheduling to increase data throughput.",
    				"Designed a Postgres database model to store jobs and their associated data, and built a corresponding REST API to allow application interaction.",
    				"Created an Amazon AWS management server to create and destroy EC2 instances to efficiently allocate funds and expedite job processing."
    			]
    		}
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Work> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		months,
    		title,
    		currentDate,
    		dateToString,
    		jobs
    	});

    	return [title, dateToString, jobs, currentDate];
    }

    class Work extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
    			title: 0,
    			currentDate: 3,
    			dateToString: 1,
    			jobs: 2
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Work",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get title() {
    		return this.$$.ctx[0];
    	}

    	set title(value) {
    		throw new Error("<Work>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get currentDate() {
    		return this.$$.ctx[3];
    	}

    	set currentDate(value) {
    		throw new Error("<Work>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get dateToString() {
    		return this.$$.ctx[1];
    	}

    	set dateToString(value) {
    		throw new Error("<Work>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get jobs() {
    		return this.$$.ctx[2];
    	}

    	set jobs(value) {
    		throw new Error("<Work>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/About.svelte generated by Svelte v3.32.3 */

    const file$2 = "src/About.svelte";

    function create_fragment$2(ctx) {
    	let span;
    	let t0;
    	let div1;
    	let div0;
    	let h1;
    	let t2;
    	let p;
    	let t3;
    	let br0;
    	let br1;
    	let t4;
    	let br2;
    	let br3;
    	let t5;
    	let a0;
    	let t7;
    	let br4;
    	let br5;
    	let t8;
    	let a1;
    	let t10;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = space();
    			div1 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			h1.textContent = `${/*title*/ ctx[0]}`;
    			t2 = space();
    			p = element("p");
    			t3 = text("Hey, I'm Kennan LeJeune! ");
    			br0 = element("br");
    			br1 = element("br");
    			t4 = text("\n      I'm a 4th year student pursuing a B.S. and M.S. in Computer Science at Case\n      Western Reserve University.​ I started programming on calculators with TI-BASIC\n      back in high school, and I've been addicted ever since. Outside of my studies,\n      I'm avid cyclist, musician, speedcuber, and linux enthusiast.\n      ");
    			br2 = element("br");
    			br3 = element("br");
    			t5 = text("\n      I currently do research in the\n      ");
    			a0 = element("a");
    			a0.textContent = "CWRU Department of Computer and Data Sciences";
    			t7 = text("\n\n      under Dr. Soumya Ray. My work investigates the properties knowledge\n      propogation through social networks in multi-agent learning systems, and\n      aims to develop dynamic optimization methods to achieve faster training\n      convergence for the network as a whole.\n      ");
    			br4 = element("br");
    			br5 = element("br");
    			t8 = text("\n      After graduation, I'm transitioning to full time work on Software Engineering\n      and Data Science at the\n      ");
    			a1 = element("a");
    			a1.textContent = "Johns Hopkins University Applied Physics Laboratory";
    			t10 = text(", where I do work on machine learning research for DNA threat\n      classification and full stack software engineering with Angular and\n      Spring.");
    			attr_dev(span, "class", "anchor bg-light");
    			attr_dev(span, "id", "about");
    			add_location(span, file$2, 3, 0, 68);
    			attr_dev(h1, "class", "header pt-3");
    			add_location(h1, file$2, 6, 4, 176);
    			add_location(br0, file$2, 8, 31, 275);
    			add_location(br1, file$2, 8, 37, 281);
    			add_location(br2, file$2, 13, 6, 615);
    			add_location(br3, file$2, 13, 12, 621);
    			attr_dev(a0, "href", "https://engineering.case.edu/computer-and-data-sciences/academics/computer-science/bachelor-science");
    			add_location(a0, file$2, 15, 6, 671);
    			add_location(br4, file$2, 24, 6, 1139);
    			add_location(br5, file$2, 24, 12, 1145);
    			attr_dev(a1, "href", "https://www.jhuapl.edu/");
    			add_location(a1, file$2, 27, 6, 1272);
    			attr_dev(p, "class", "py-3 lead body svelte-1jhmt9n");
    			add_location(p, file$2, 7, 4, 217);
    			attr_dev(div0, "class", "container");
    			add_location(div0, file$2, 5, 2, 148);
    			attr_dev(div1, "class", "about page bg-light");
    			add_location(div1, file$2, 4, 0, 112);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h1);
    			append_dev(div0, t2);
    			append_dev(div0, p);
    			append_dev(p, t3);
    			append_dev(p, br0);
    			append_dev(p, br1);
    			append_dev(p, t4);
    			append_dev(p, br2);
    			append_dev(p, br3);
    			append_dev(p, t5);
    			append_dev(p, a0);
    			append_dev(p, t7);
    			append_dev(p, br4);
    			append_dev(p, br5);
    			append_dev(p, t8);
    			append_dev(p, a1);
    			append_dev(p, t10);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("About", slots, []);
    	const title = "The Essentials";
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<About> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ title });
    	return [title];
    }

    class About extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { title: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "About",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get title() {
    		return this.$$.ctx[0];
    	}

    	set title(value) {
    		throw new Error("<About>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Home.svelte generated by Svelte v3.32.3 */

    const file$3 = "src/Home.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (29:4) {#each icons as icon}
    function create_each_block$2(ctx) {
    	let a;
    	let i;
    	let t;

    	const block = {
    		c: function create() {
    			a = element("a");
    			i = element("i");
    			t = space();
    			attr_dev(i, "class", "wow fadeInUp " + /*icon*/ ctx[1].iconClass + " svelte-1hf3i2s");
    			add_location(i, file$3, 35, 8, 857);
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "rel", "noopener noreferrer");
    			attr_dev(a, "href", /*icon*/ ctx[1].link);
    			attr_dev(a, "class", "button m-3 svelte-1hf3i2s");
    			add_location(a, file$3, 29, 6, 728);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, i);
    			append_dev(a, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(29:4) {#each icons as icon}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let span0;
    	let t0;
    	let div;
    	let h1;
    	let t2;
    	let span1;
    	let t3;
    	let a;
    	let i;
    	let each_value = /*icons*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			t0 = space();
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "Hi, I'm Kennan";
    			t2 = space();
    			span1 = element("span");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t3 = space();
    			a = element("a");
    			i = element("i");
    			attr_dev(span0, "class", "anchor svelte-1hf3i2s");
    			attr_dev(span0, "id", "home");
    			add_location(span0, file$3, 24, 0, 571);
    			attr_dev(h1, "class", "wow fadeInUp svelte-1hf3i2s");
    			add_location(h1, file$3, 26, 2, 631);
    			attr_dev(span1, "id", "icons");
    			attr_dev(span1, "class", "svelte-1hf3i2s");
    			add_location(span1, file$3, 27, 2, 678);
    			attr_dev(i, "class", "wow fadeInUp fas fa-chevron-circle-down fa-2x svelte-1hf3i2s");
    			add_location(i, file$3, 40, 4, 988);
    			attr_dev(a, "id", "down");
    			attr_dev(a, "class", "button my-5 svelte-1hf3i2s");
    			attr_dev(a, "href", "#about");
    			add_location(a, file$3, 39, 2, 936);
    			attr_dev(div, "class", "page home svelte-1hf3i2s");
    			add_location(div, file$3, 25, 0, 605);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t2);
    			append_dev(div, span1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(span1, null);
    			}

    			append_dev(div, t3);
    			append_dev(div, a);
    			append_dev(a, i);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*icons*/ 1) {
    				each_value = /*icons*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(span1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Home", slots, []);

    	const icons = [
    		{
    			link: "https://github.com/kclejeune",
    			iconClass: "fa-2x fab fa-github"
    		},
    		{
    			link: "https://linkedin.com/in/kclejeune",
    			iconClass: "fa-2x fab fa-linkedin"
    		},
    		{
    			link: "https://keybase.io/kclejeune",
    			iconClass: "fa-2x fab fa-keybase"
    		},
    		{
    			link: "mailto:contact@kclj.io",
    			iconClass: "fa-2x far fa-envelope"
    		},
    		{
    			link: "https://kclejeune.keybase.pub/resume.pdf",
    			iconClass: "fa-2x far fa-file-alt"
    		}
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ icons });
    	return [icons];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/Navbar.svelte generated by Svelte v3.32.3 */

    const file$4 = "src/Navbar.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (42:6) {#each pages as page}
    function create_each_block$3(ctx) {
    	let li;
    	let a;
    	let t0_value = /*page*/ ctx[1].title + "";
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			li = element("li");
    			a = element("a");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(a, "class", "nav-link");
    			attr_dev(a, "href", "#" + /*page*/ ctx[1].page);
    			add_location(a, file$4, 47, 10, 1102);
    			attr_dev(li, "class", "nav-item");
    			attr_dev(li, "data-toggle", "collapse");
    			attr_dev(li, "data-target", ".navbar-collapse.show");
    			add_location(li, file$4, 42, 8, 972);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, a);
    			append_dev(a, t0);
    			append_dev(li, t1);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(42:6) {#each pages as page}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let nav;
    	let a;
    	let t1;
    	let button;
    	let span;
    	let t2;
    	let div;
    	let ul;
    	let each_value = /*pages*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			a = element("a");
    			a.textContent = "Kennan LeJeune";
    			t1 = space();
    			button = element("button");
    			span = element("span");
    			t2 = space();
    			div = element("div");
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(a, "class", "navbar-brand button");
    			attr_dev(a, "href", "#home");
    			add_location(a, file$4, 26, 2, 472);
    			attr_dev(span, "class", "navbar-toggler-icon");
    			add_location(span, file$4, 36, 4, 771);
    			attr_dev(button, "class", "navbar-toggler");
    			attr_dev(button, "type", "button");
    			attr_dev(button, "data-toggle", "collapse");
    			attr_dev(button, "data-target", "#navbarSupportedContent");
    			attr_dev(button, "aria-controls", "navbarSupportedContent");
    			attr_dev(button, "aria-expanded", "false");
    			attr_dev(button, "aria-label", "Toggle navigation");
    			add_location(button, file$4, 27, 2, 537);
    			attr_dev(ul, "class", "navbar-nav nav-pills mr-auto");
    			add_location(ul, file$4, 40, 4, 894);
    			attr_dev(div, "class", "collapse navbar-collapse");
    			attr_dev(div, "id", "navbarSupportedContent");
    			add_location(div, file$4, 39, 2, 823);
    			attr_dev(nav, "class", "navbar fixed-top navbar-expand-lg navbar-dark elegant-color");
    			add_location(nav, file$4, 25, 0, 396);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, a);
    			append_dev(nav, t1);
    			append_dev(nav, button);
    			append_dev(button, span);
    			append_dev(nav, t2);
    			append_dev(nav, div);
    			append_dev(div, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*pages*/ 1) {
    				each_value = /*pages*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Navbar", slots, []);

    	const pages = [
    		{ page: "home", title: "Home" },
    		{ page: "about", title: "About Me" },
    		{ page: "experience", title: "Experience" },
    		{ page: "projects", title: "Projects" },
    		{ page: "technologies", title: "Skills" }
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Navbar> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ pages });
    	return [pages];
    }

    class Navbar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { pages: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Navbar",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get pages() {
    		return this.$$.ctx[0];
    	}

    	set pages(value) {
    		throw new Error("<Navbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Projects.svelte generated by Svelte v3.32.3 */

    const file$5 = "src/Projects.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (34:14) {#if repo?.description}
    function create_if_block_1(ctx) {
    	let li;
    	let t0;
    	let t1_value = /*repo*/ ctx[2].description + "";
    	let t1;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t0 = text("Description: ");
    			t1 = text(t1_value);
    			add_location(li, file$5, 34, 16, 1150);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t0);
    			append_dev(li, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*repos*/ 2 && t1_value !== (t1_value = /*repo*/ ctx[2].description + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(34:14) {#if repo?.description}",
    		ctx
    	});

    	return block;
    }

    // (39:14) {#if repo.stars > 0}
    function create_if_block(ctx) {
    	let li;
    	let t0;
    	let t1_value = /*repo*/ ctx[2].stars + "";
    	let t1;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t0 = text("Stars: ");
    			t1 = text(t1_value);
    			add_location(li, file$5, 39, 16, 1298);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t0);
    			append_dev(li, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*repos*/ 2 && t1_value !== (t1_value = /*repo*/ ctx[2].stars + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(39:14) {#if repo.stars > 0}",
    		ctx
    	});

    	return block;
    }

    // (21:6) {#each repos as repo}
    function create_each_block$4(ctx) {
    	let div1;
    	let div0;
    	let h5;
    	let t0_value = titleCase(/*repo*/ ctx[2].repo.replaceAll("-", " ")) + "";
    	let t0;
    	let t1;
    	let h6;
    	let a;
    	let t2_value = /*repo*/ ctx[2].link + "";
    	let t2;
    	let a_href_value;
    	let t3;
    	let ul;
    	let li;
    	let t4;
    	let t5_value = /*repo*/ ctx[2].language + "";
    	let t5;
    	let t6;
    	let t7;
    	let t8;
    	let if_block0 = /*repo*/ ctx[2]?.description && create_if_block_1(ctx);
    	let if_block1 = /*repo*/ ctx[2].stars > 0 && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			h5 = element("h5");
    			t0 = text(t0_value);
    			t1 = space();
    			h6 = element("h6");
    			a = element("a");
    			t2 = text(t2_value);
    			t3 = space();
    			ul = element("ul");
    			li = element("li");
    			t4 = text("Language: ");
    			t5 = text(t5_value);
    			t6 = space();
    			if (if_block0) if_block0.c();
    			t7 = space();
    			if (if_block1) if_block1.c();
    			t8 = space();
    			attr_dev(h5, "class", "card-title text-dark");
    			add_location(h5, file$5, 23, 12, 765);
    			attr_dev(a, "href", a_href_value = /*repo*/ ctx[2].link);
    			add_location(a, file$5, 27, 14, 944);
    			attr_dev(h6, "class", "card-subtitle mb-2 text-muted");
    			add_location(h6, file$5, 26, 12, 887);
    			add_location(li, file$5, 30, 14, 1029);
    			add_location(ul, file$5, 29, 12, 1010);
    			attr_dev(div0, "class", "card-body");
    			add_location(div0, file$5, 22, 10, 729);
    			attr_dev(div1, "class", "card m-2 wow zoomIn");
    			add_location(div1, file$5, 21, 8, 685);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h5);
    			append_dev(h5, t0);
    			append_dev(div0, t1);
    			append_dev(div0, h6);
    			append_dev(h6, a);
    			append_dev(a, t2);
    			append_dev(div0, t3);
    			append_dev(div0, ul);
    			append_dev(ul, li);
    			append_dev(li, t4);
    			append_dev(li, t5);
    			append_dev(ul, t6);
    			if (if_block0) if_block0.m(ul, null);
    			append_dev(ul, t7);
    			if (if_block1) if_block1.m(ul, null);
    			append_dev(div1, t8);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*repos*/ 2 && t0_value !== (t0_value = titleCase(/*repo*/ ctx[2].repo.replaceAll("-", " ")) + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*repos*/ 2 && t2_value !== (t2_value = /*repo*/ ctx[2].link + "")) set_data_dev(t2, t2_value);

    			if (dirty & /*repos*/ 2 && a_href_value !== (a_href_value = /*repo*/ ctx[2].link)) {
    				attr_dev(a, "href", a_href_value);
    			}

    			if (dirty & /*repos*/ 2 && t5_value !== (t5_value = /*repo*/ ctx[2].language + "")) set_data_dev(t5, t5_value);

    			if (/*repo*/ ctx[2]?.description) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1(ctx);
    					if_block0.c();
    					if_block0.m(ul, t7);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*repo*/ ctx[2].stars > 0) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block(ctx);
    					if_block1.c();
    					if_block1.m(ul, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(21:6) {#each repos as repo}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let span;
    	let t0;
    	let div2;
    	let div1;
    	let h1;
    	let t2;
    	let div0;
    	let each_value = /*repos*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = space();
    			div2 = element("div");
    			div1 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Projects";
    			t2 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(span, "class", "anchor bg-primary");
    			attr_dev(span, "id", "projects");
    			add_location(span, file$5, 15, 0, 437);
    			attr_dev(h1, "class", "header pt-3");
    			add_location(h1, file$5, 18, 4, 553);
    			attr_dev(div0, "class", "wow fadeIn py-3 my-auto text-dark cards");
    			add_location(div0, file$5, 19, 4, 595);
    			attr_dev(div1, "class", "container");
    			add_location(div1, file$5, 17, 2, 525);
    			attr_dev(div2, "class", "projects page bg-light");
    			add_location(div2, file$5, 16, 0, 486);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, h1);
    			append_dev(div1, t2);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*repos, titleCase*/ 3) {
    				each_value = /*repos*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const username = "kclejeune";

    function titleCase(str) {
    	return str.replace(/\w\S*/g, txt => {
    		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    	});
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Projects", slots, []);
    	let repos = Array();

    	fetch(`https://gh-pinned-repos-5l2i19um3.vercel.app/?username=${username}`).then(res => res.json()).then(json => {
    		$$invalidate(1, repos = json);
    		repos.sort((a, b) => b.stars - a.stars);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Projects> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ username, repos, titleCase });

    	$$self.$inject_state = $$props => {
    		if ("repos" in $$props) $$invalidate(1, repos = $$props.repos);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [titleCase, repos];
    }

    class Projects extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { titleCase: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Projects",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get titleCase() {
    		return titleCase;
    	}

    	set titleCase(value) {
    		throw new Error("<Projects>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.32.3 */

    function create_fragment$6(ctx) {
    	let navbar;
    	let t0;
    	let home;
    	let t1;
    	let about;
    	let t2;
    	let work;
    	let t3;
    	let projects;
    	let t4;
    	let skills;
    	let current;
    	navbar = new Navbar({ $$inline: true });
    	home = new Home({ $$inline: true });
    	about = new About({ $$inline: true });
    	work = new Work({ $$inline: true });
    	projects = new Projects({ $$inline: true });
    	skills = new Skills({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(navbar.$$.fragment);
    			t0 = space();
    			create_component(home.$$.fragment);
    			t1 = space();
    			create_component(about.$$.fragment);
    			t2 = space();
    			create_component(work.$$.fragment);
    			t3 = space();
    			create_component(projects.$$.fragment);
    			t4 = space();
    			create_component(skills.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(navbar, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(home, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(about, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(work, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(projects, target, anchor);
    			insert_dev(target, t4, anchor);
    			mount_component(skills, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navbar.$$.fragment, local);
    			transition_in(home.$$.fragment, local);
    			transition_in(about.$$.fragment, local);
    			transition_in(work.$$.fragment, local);
    			transition_in(projects.$$.fragment, local);
    			transition_in(skills.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(navbar.$$.fragment, local);
    			transition_out(home.$$.fragment, local);
    			transition_out(about.$$.fragment, local);
    			transition_out(work.$$.fragment, local);
    			transition_out(projects.$$.fragment, local);
    			transition_out(skills.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(navbar, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(home, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(about, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(work, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(projects, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_component(skills, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Skills,
    		Work,
    		About,
    		Home,
    		Navbar,
    		Projects
    	});

    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    const app = new App({
        target: document.body,
        props: {},
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
