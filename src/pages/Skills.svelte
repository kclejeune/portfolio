<script lang="ts">
    import Page from "../components/Page.svelte";

    const title: string = "Technologies I Use";
    const skills: Array<string> = [
        "Python",
        "Scikit-Learn",
        "Tensorflow",
        "Keras",
        "NixOS",
        "Bash",
        "Awk",
        "TypeScript",
        "Javascript",
        "Angular",
        "Vue",
        "Svelte",
        "HTML",
        "CSS",
        "Java",
        "Kotlin",
        "SQL",
        "Scheme",
    ];
</script>

<Page
    id="technologies"
    title="Technologies I Use"
    lightBackgroundClass="bg-gray-200"
    darkBackgroundClass="bg-gray-600"
>
    <div
        class="container grid grid-cols-1 gap-4 p-4 mx-auto sm:container md:grid-cols-3 sm:grid-cols-2"
    >
        {#each skills as skill}
            <div
                class="overflow-hidden shadow-xl bg-gray-50 rounded-xl dark:bg-gray-800"
            >
                <div class="px-6 py-4 text-2xl font-medium text-center">
                    {skill}
                </div>
            </div>
        {/each}
    </div>
</Page>
