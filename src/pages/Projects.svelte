<script lang="ts">
    import Header from "../components/Header.svelte";
    import Card from "../components/Card.svelte";
    import Page from "../components/Page.svelte";
    import LoadingCard from "../components/LoadingCard.svelte";
    import Content from "../components/Content.svelte";

    type Project = {
        owner: string;
        repo: string;
        link: string;
        description: string;
        language: string;
        stars: number;
        forks: number;
    };
    const username = "kclejeune";
    const API_URL = "https://gh-pinned-repos-5l2i19um3.vercel.app";

    // load pinned github repositories
    async function getProjects(): Promise<Project[]> {
        return fetch(`${API_URL}/?username=${username}`)
            .then((res) => res.json())
            .then((json: Project[]) =>
                json.sort((a: Project, b: Project) => b.stars - a.stars)
            );
    }

    let projectPromise: Promise<Project[]> = getProjects();

    // convert repo names into titles
    function titleCase(str: string): string {
        // don't apply this to things that are named using my username
        if (str.includes(username)) {
            return str;
        }

        return str.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
</script>

<Page
    id="projects"
    title="Projects"
    lightBackground="bg-blue-200"
    darkBackground="bg-blue-900"
>
    <div
        class="container grid max-w-screen-xl gap-4 p-4 mx-auto md:grid-cols-1 xl:grid-cols-2"
    >
        {#await projectPromise}
            <LoadingCard />
        {:then repos}
            {#each repos as repo}
                <Card
                    title={titleCase(repo.repo.replaceAll("-", " "))}
                    url={repo.link}
                    tags={[repo.language]}
                >
                    {repo.description}
                </Card>
            {/each}
        {/await}
    </div>
</Page>
