<script lang="ts">
    import Link from "../components/Link.svelte";
    import Page from "../components/Page.svelte";
    import Text from "../components/Text.svelte";
</script>

<Page
    id="about"
    title="The Essentials"
    backgroundClass="bg-blue-200 dark:bg-blue-900"
>
    <Text>
        <p>Hey, I'm Kennan!</p>
        <br />
        <p>
            I'm a recent Computer Science graduate and current M.S. Computer
            Science candidate at Case Western Reserve University.​ I started
            programming on calculators with TI-BASIC back in high school, and
            I've been addicted ever since. Outside of my studies, I'm an avid
            cyclist, musician, linux enthusiast, and speedcuber.
        </p>
        <br />
        <p>
            I currently do research in the <Link
                url="https://engineering.case.edu/computer-and-data-sciences/academics/computer-science/bachelor-science"
            >
                CWRU Department of Computer and Data Sciences
            </Link>
            under Dr. Soumya Ray. My work investigates the properties of knowledge
            propogation through social networks in multi-agent learning systems,
            and aims to develop dynamic optimization methods to achieve faster training
            convergence for the network as a whole.
        </p>
        <br />
        <p>
            After graduation, I'm transitioning to full time work on Software
            Engineering and Data Science at the
            <Link url="https://www.jhuapl.edu/">
                Johns Hopkins University Applied Physics Laboratory
            </Link>, where I do work on machine learning research for DNA threat
            classification and full stack software engineering with Angular and
            Spring.
        </p>
    </Text>
</Page>
