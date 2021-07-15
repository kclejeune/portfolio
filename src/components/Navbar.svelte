<script lang="ts">
    export const pages = [
        {
            page: "#home",
            title: "Home",
        },
        {
            page: "#about",
            title: "About Me",
        },
        {
            page: "#experience",
            title: "Experience",
        },
        {
            page: "#projects",
            title: "Projects",
        },
        {
            page: "#technologies",
            title: "Skills",
        },
    ];

    import { scrollto } from "svelte-scrollto";
    import * as animateScroll from "svelte-scrollto";
    // animateScroll.setGlobalOptions({
    //     offset: -64,
    // });

    let open = false;
    $: visible = open ? "visible" : "hidden";
    $: hidden = open ? "hidden" : "visible";
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<nav class="text-neutral-800 bg-neutral-400 shadow-lg dark:bg-neutral-900 dark:text-neutral-200">
    <div class="px-2 max-w-7xl sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
            <span class="my-2 sm:visible sm:text-xl">Kennan LeJeune</span>
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <!-- Mobile menu button-->
                <button
                    on:click={() => (open = !open)}
                    type="button"
                    class="inline-flex items-center justify-center p-2 bg-neutral-200 rounded-md dark:bg-neutral-700 dark:hover:bg-neutral-600 hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
            <div
                class="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start"
            >
                <div class="hidden sm:block sm:ml-6">
                    <div class="flex space-x-4">
                        <!-- Current: "bg-neutral-900 text-white", Default: "text-neutral-300 hover:bg-neutral-700 hover:text-white" -->
                        {#each pages as page}
                            <a
                                href={page.page}
                                use:scrollto={page.page}
                                class="px-4 py-2 text-sm font-medium bg-neutral-200 rounded-md hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                                aria-current="page">{page.title}</a
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
            <!-- Current: "bg-neutral-900 text-white", Default: "text-neutral-300 hover:bg-neutral-700 hover:text-white" -->
            {#each pages as page}
                <a
                    href={page.page}
                    on:click={() => (open = false)}
                    use:scrollto={page.page}
                    class="block px-4 py-2 font-medium bg-neutral-200 rounded-md hover:bg-neutral-300"
                    aria-current="page">{page.title}</a
                >
            {/each}
        </div>
    </div>
</nav>
