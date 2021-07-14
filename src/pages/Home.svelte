<script lang="ts">
    let color: string = "text-blue-300";
    let hoverColor: string = "text-blue-500";
    import IconButton from "../components/IconButton.svelte";

    type Icon = {
        link: string;
        iconClass: string;
        name: string;
    };
    const icons: Array<Icon> = [
        {
            link: "https://github.com/kclejeune",
            iconClass: "fa-2x fab fa-github",
            name: "GitHub",
        },
        {
            link: "https://linkedin.com/in/kclejeune",
            iconClass: "fa-2x fab fa-linkedin",
            name: "LinkedIn",
        },
        {
            link: "https://keybase.io/kclejeune",
            iconClass: "fa-2x fab fa-keybase",
            name: "Keybase",
        },
        {
            link: "mailto:contact@kclj.io",
            iconClass: "fa-2x far fa-envelope",
            name: "Email",
        },
        {
            link: "https://kclejeune.keybase.pub/resume.pdf",
            iconClass: "fa-2x far fa-file-alt",
            name: "Resume",
        },
    ];
</script>

<div
    class="flex flex-col items-center justify-around min-w-full min-h-screen bg-center bg-no-repeat bg-cover lg:bg-fixed"
    id="bg"
>
    <div class="w-0 h-0" />
    <div>
        <h1 class="text-5xl m-6 text-center {color} font-light">
            Hi, I'm Kennan.
        </h1>
        <span>
            {#each icons as icon}
                <IconButton
                    {...icon}
                    customClass="m-5"
                    colorClass="{color} hover:{hoverColor}"
                />
            {/each}
        </span>
    </div>
    <IconButton
        link="#about"
        scrollId="#about"
        name="scroll down"
        customClass="py-20"
        colorClass="{color} hover:{hoverColor}"
        iconClass="fas fa-chevron-circle-down fa-2x"
    />
</div>

<style>
    #bg {
        /* The image used */
        background-image: linear-gradient(
                to bottom,
                rgba(0, 0, 0, 0.6) 0%,
                rgba(0, 0, 0, 0.6) 100%
            ),
            url("/assets/images/cube.webp");
        background-color: rgba(0, 0, 0, 0.6);
    }
</style>
