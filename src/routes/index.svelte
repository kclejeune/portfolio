<script lang="ts">
    import Skills from "../pages/Skills.svelte";
    import Work from "../pages/Work.svelte";
    import About from "../pages/About.svelte";
    import Home from "../pages/Home.svelte";
    import Projects from "../pages/Projects.svelte";
    import Page from "../components/Page.svelte";
    let primaryBackground = "bg-primary-200 dark:bg-primary-900";
    let neutralBackground = "bg-neutral-200 dark:bg-neutral-900";
</script>

<main id="main">
    <Home />
    <!--About me/bio-->
    <About backgroundClass={primaryBackground} />
    <!--Work Experience-->
    <Work backgroundClass={neutralBackground} />
    <!-- Starred Projects from Github -->
    <Projects backgroundClass={primaryBackground} />
    <!--Technologies I've worked with-->
    <Skills backgroundClass={neutralBackground} />
</main>
