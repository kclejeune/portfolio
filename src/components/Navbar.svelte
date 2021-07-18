<script lang="ts">
    import { page } from "$app/stores";
    import * as animateScroll from "svelte-scrollto";
    import { scrollToElement } from "../utils";

    animateScroll.setGlobalOptions({
        onStart: (element, offset) => {
            open = false;
        },
    });

    export const pages = [
        {
            id: "#home",
            route: "/home",
            name: "home",
            title: "Home",
        },
        {
            id: "#about",
            route: "/about",
            name: "about",
            title: "About Me",
        },
        {
            id: "#work",
            route: "/work",
            name: "work",
            title: "Work Experience",
        },
        {
            id: "#projects",
            route: "/projects",
            name: "projects",
            title: "Projects",
        },
        {
            id: "#skills",
            route: "/skills",
            name: "skills",
            title: "Skills",
        },
    ];

    let open = false;
    let colors = {
        nav: "bg-neutral-800",
        button: {
            active: "bg-primary-800 hover:bg-primary-700",
            inactive: "bg-neutral-700 hover:bg-neutral-600",
        },
        buttonText: "text-neutral-200",
    };

    let active = $page.path;
    $: visible = open ? "visible" : "hidden";
    $: hidden = open ? "hidden" : "visible";
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<nav class="fixed top-0 w-full {colors.buttonText} shadow-xl  {colors.nav}">
    <div class="px-2 max-w-7xl sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <!-- Mobile menu button-->
                <button
                    on:click={() => (open = !open)}
                    type="button"
                    class="inline-flex items-center justify-center p-2 rounded-lg shadow-lg {colors
                        .button.inactive}"
                    aria-controls="mobile-menu"
                    aria-expanded={open}
                >
                    <span class="sr-only">Open main menu</span>

                    <svg
                        class="{hidden} w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>

                    <svg
                        class="{visible} w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden={!open}
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
            <!-- expanded nav page -->
            <div
                class="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start"
            >
                <div class="hidden sm:block">
                    <div class="flex space-x-4">
                        <!-- Current: "bg-neutral-900 text-white", Default: "text-neutral-300 hover:bg-neutral-700 hover:text-white" -->
                        {#each pages as route}
                            <a
                                href={route.id}
                                on:click={() => {
                                    active = route.route;
                                    scrollToElement(route.id);
                                }}
                                class="px-4 py-2 text-sm font-medium rounded-md shadow-lg {colors
                                    .button.inactive}"
                                aria-current="page">{route.title}</a
                            >
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="{visible} sm:hidden" id="mobile-menu">
        <div class="px-2 pt-2 pb-3 space-y-1">
            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
            {#each pages as route}
                <a
                    href={route.id}
                    on:click={() => {
                        open = false;
                        scrollToElement(route.id);
                    }}
                    class="{colors.button
                        .inactive} text-white block px-3 py-2 rounded-md text-base font-medium"
                    aria-current="page">{route.title}</a
                >
            {/each}
        </div>
    </div>
</nav>
