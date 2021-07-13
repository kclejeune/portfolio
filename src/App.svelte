<script lang="ts">
    import Skills from "./Skills.svelte";
    import Work from "./Work.svelte";
    import About from "./About.svelte";
    import Home from "./Home.svelte";
    import Projects from "./Projects.svelte";
</script>

<!-- <Navbar /> -->
<main>
    <!--Landing Page-->
    <Home />
    <!--About me/bio-->
    <About />
    <!--Work Experience-->
    <Work />
    <!-- Starred Projects from Github -->
    <Projects />
    <!--Technologies I've worked with-->
    <Skills />
</main>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
