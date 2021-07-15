<script lang="ts">
    import Card from "../components/Card.svelte";
    import LoadingCard from "../components/LoadingCard.svelte";

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

{#await projectPromise}
    <div class="container grid max-w-screen-xl grid-cols-1 gap-4 mx-auto">
        <LoadingCard />
    </div>
{:then repos}
    <div
        class="container grid max-w-screen-xl gap-4 mx-auto md:grid-cols-1 lg:grid-cols-2"
    >
        {#each repos as repo}
            <Card
                title={titleCase(repo.repo.replaceAll("-", " "))}
                url={repo.link}
                tags={[repo.language]}
            >
                {#if repo.stars > 0}
                    <div>
                        Stars: {repo.stars}
                    </div>
                {/if}
                <div>
                    {repo.description}
                </div>
            </Card>
        {/each}
    </div>
{/await}
