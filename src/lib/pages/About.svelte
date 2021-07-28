<script lang="ts">
    import Link from "$lib/components/Link.svelte";
    import Page from "$lib/components/Page.svelte";
    import Text from "$lib/components/Text.svelte";
    import { primaryBackground } from "../utils/constants";

    export let backgroundClass = primaryBackground;
</script>

<Page id="about" title="The Essentials" {backgroundClass}>
    <Text>
        <p>Hey, I'm Kennan!</p>
        <br />
        <p>
            I recently graduated with honors in Computer Science from Case
            Western Reserve University, where I'm continuing my studies as a
            graduate student.​ I started programming on calculators with
            TI-BASIC back in high school, and I've been addicted ever since.
            Outside of my studies, I'm an avid cyclist, musician, linux
            enthusiast, and speedcuber.
        </p>
        <br />
        <p>
            I work on graduate research in the <Link
                url="https://engineering.case.edu/computer-and-data-sciences/academics/computer-science/bachelor-science"
            >
                CWRU Department of Computer and Data Sciences
            </Link>
            under Dr. Soumya Ray. My work investigates knowledge propogation through
            networks in multi-agent learning systems, and aims to develop dynamic
            optimization methods to improve overall network performance.
        </p>
        <br />
        <p>
            After graduation, I'm transitioning to full time work on Software
            Engineering and Data Science at the
            <Link url="https://www.jhuapl.edu/"
                >Johns Hopkins University Applied Physics Laboratory</Link
            >, where I do work on machine learning research for DNA threat
            classification and full stack software engineering with Angular and
            Spring.
        </p>
    </Text>
</Page>
