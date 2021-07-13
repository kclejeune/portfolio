<script lang="ts">
    import Header from "./components/Header.svelte";

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

<div
    id="technologies"
    class="min-w-full min-h-screen bg-gray-200 dark:bg-gray-600"
>
    <Header header={title} />
    <div
        class="container grid grid-cols-1 gap-4 px-4 py-8 mx-auto sm:container md:grid-cols-3 sm:grid-cols-2"
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
</div>
