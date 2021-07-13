<script lang="ts">
    let color: string = "text-blue-300";
    let hoverColor: string = "text-blue-500";
    import { scrollto } from "svelte-scrollto";

    type Icon = {
        link: string;
        iconClass: string;
    };
    const icons: Array<Icon> = [
        {
            link: "https://github.com/kclejeune",
            iconClass: "fa-2x fab fa-github",
        },
        {
            link: "https://linkedin.com/in/kclejeune",
            iconClass: "fa-2x fab fa-linkedin",
        },
        {
            link: "https://keybase.io/kclejeune",
            iconClass: "fa-2x fab fa-keybase",
        },
        {
            link: "mailto:contact@kclj.io",
            iconClass: "fa-2x far fa-envelope",
        },
        {
            link: "https://kclejeune.keybase.pub/resume.pdf",
            iconClass: "fa-2x far fa-file-alt",
        },
    ];
</script>

<div
    class="flex flex-col items-center justify-around min-w-full min-h-screen bg-center bg-no-repeat bg-cover lg:bg-fixed"
    id="bg"
>
    <div class="w-0 h-0" />
    <div>
        <h1 class="text-5xl m-6 text-center {color}  font-light">
            Hi, I'm Kennan
        </h1>
        <span>
            {#each icons as icon}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={icon.link}
                    class="m-5 {color} md:hover:{hoverColor}"
                >
                    <i class={icon.iconClass} />
                </a>
            {/each}
        </span>
    </div>
    <a
        id="down"
        use:scrollto={"#about"}
        class="py-20 {color} hover:{hoverColor}"
        href="#about"
    >
        <i class="fas fa-chevron-circle-down fa-2x" />
    </a>
</div>

<style>
    #bg {
        /* The image used */
        background-image: linear-gradient(
                to bottom,
                rgba(0, 0, 0, 0.6) 0%,
                rgba(0, 0, 0, 0.6) 100%
            ),
            url("/assets/cube.jpg");
        background-color: rgba(0, 0, 0, 0.6);
    }
</style>
