<script lang="ts">
    import Skills from "./pages/Skills.svelte";
    import Work from "./pages/Work.svelte";
    import About from "./pages/About.svelte";
    import Home from "./pages/Home.svelte";
    import Projects from "./pages/Projects.svelte";
    import Page from "./components/Page.svelte";

    let primaryBackground = "bg-primary-200 dark:bg-primary-900";
    let neutralBackground = "bg-neutral-200 dark:bg-neutral-900";
</script>

<!-- <Navbar /> -->
<main>
    <!--Landing Page-->
    <Home />
    <!--About me/bio-->
    <Page id="about" title="The Essentials" backgroundClass={primaryBackground}>
        <About />
    </Page>
    <!--Work Experience-->
    <Page
        id="experience"
        title="Work Experience"
        backgroundClass={neutralBackground}
    >
        <Work />
    </Page>
    <!-- Starred Projects from Github -->
    <Page id="projects" title="Projects" backgroundClass={primaryBackground}>
        <Projects />
    </Page>
    <!--Technologies I've worked with-->
    <Page
        id="technologies"
        title="Technologies I Use"
        backgroundClass={neutralBackground}
    >
        <Skills />
    </Page>
</main>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
