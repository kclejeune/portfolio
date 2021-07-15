<script lang="ts">
    let color = "text-primary-300";
    let hover = "sm:hover:text-primary-500";
    let colorClass = `${color} ${hover}`;
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
    <div class="text-center">
        <h1 class="text-5xl m-6 {color} font-light">Hi, I'm Kennan.</h1>
        {#each icons as icon}
            <IconButton {...icon} {colorClass} customClass="mx-5" />
        {/each}
    </div>
    <IconButton
        link="#about"
        scrollId="#about"
        name="scroll down"
        {colorClass}
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
