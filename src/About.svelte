<script lang="ts">
    import Header from "./components/Header.svelte";

    export const title: string = "The Essentials";
</script>

<div id="about" class="w-screen min-h-screen bg-blue-200 dark:bg-blue-900">
    <Header header={title} />
    <p class="container px-4 py-8 mx-auto text-lg font-light md:max-w-prose">
        Hey, I'm Kennan!
        <br /><br />
        I'm a recent Computer Science graduate and current M.S. Computer Science
        candidate at Case Western Reserve University.​ I started programming on calculators
        with TI-BASIC back in high school, and I've been addicted ever since. Outside
        of my studies, I'm an avid cyclist, musician, linux enthusiast, and speedcuber.
        <br /><br />
        I currently do research in the
        <a
            class="text-blue-700 underline hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-500"
            href="https://engineering.case.edu/computer-and-data-sciences/academics/computer-science/bachelor-science"
        >
            CWRU Department of Computer and Data Sciences
        </a>

        under Dr. Soumya Ray. My work investigates the properties of knowledge
        propogation through social networks in multi-agent learning systems, and
        aims to develop dynamic optimization methods to achieve faster training
        convergence for the network as a whole.
        <br /><br />
        After graduation, I'm transitioning to full time work on Software Engineering
        and Data Science at the
        <a href="https://www.jhuapl.edu/"
            >Johns Hopkins University Applied Physics Laboratory</a
        >, where I do work on machine learning research for DNA threat
        classification and full stack software engineering with Angular and
        Spring.
    </p>
</div>
