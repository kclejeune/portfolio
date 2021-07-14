<script lang="ts">
    import Skills from "./pages/Skills.svelte";
    import Work from "./pages/Work.svelte";
    import About from "./pages/About.svelte";
    import Home from "./pages/Home.svelte";
    import Projects from "./pages/Projects.svelte";
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
