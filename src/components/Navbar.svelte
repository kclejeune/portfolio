<script lang="ts">
    import { page } from "$app/stores";
    export const pages = [
        {
            route: "/",
            title: "Home",
        },
        {
            route: "/about",
            title: "About Me",
        },
        {
            route: "/experience",
            title: "Experience",
        },
        {
            route: "/projects",
            title: "Projects",
        },
        {
            route: "/skills",
            title: "Skills",
        },
    ];

    let open = false;
    let colors = {
        nav: "bg-neutral-700",
        button: {
            active: "bg-primary-800 hover:bg-primary-700",
            inactive: "bg-neutral-900 hover:bg-neutral-800",
        },
        buttonText: "text-neutral-200",
    };

    $: visible = open ? "visible" : "hidden";
    $: hidden = open ? "hidden" : "visible";
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<nav class="fixed top-0 min-w-full {colors.buttonText} shadow-xl  {colors.nav}">
    <div class="px-2 max-w-7xl sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <!-- Mobile menu button-->
                <button
                    on:click={() => (open = !open)}
                    type="button"
                    class="inline-flex items-center justify-center p-2 rounded-lg shadow-lg {colors.button.inactive}"
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
                <span class="mx-4 sm:hidden text-lg {colors.buttonText}">
                    Kennan LeJeune
                </span>
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
                                href={route.route}
                                class="px-4 py-2 text-sm font-medium rounded-md shadow-lg {route.route ===
                                $page.path
                                    ? colors.button.active
                                    : colors.button.inactive}"
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
        <div class="p-2 space-y-1">
            {#each pages as route}
                <a
                    type="button"
                    href={route.route}
                    on:click={() => {
                        open = false;
                    }}
                    class="block px-4 py-2 font-medium {route.route ===
                    $page.path
                        ? colors.button.active
                        : colors.button.inactive} rounded-lg"
                    aria-current="page">{route.title}</a
                >
            {/each}
        </div>
    </div>
</nav>
