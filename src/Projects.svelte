<script lang="ts">
  type Project = {
    owner: string;
    repo: string;
    link: string;
    description: string;
    language: string;
    stars: number;
    forks: number;
  };
  const username = 'kclejeune';
  let repos = Array<Project>();
  fetch(`https://gh-pinned-repos-5l2i19um3.vercel.app/?username=${username}`)
    .then((res) => res.json())
    .then((json: Array<Project>) => {
      repos = json;
      repos.sort((a: Project, b: Project) => b.stars - a.stars);
    });
  export function titleCase(str: string) {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
</script>

<span class="anchor bg-primary" id="projects" />
<div class="projects page bg-light">
  <div class="container">
    <h1 class="header pt-3">Projects</h1>
    <div class="wow fadeIn py-3 my-auto text-dark cards">
      {#each repos as repo}
        <div class="card m-2 wow zoomIn">
          <div class="card-body">
            <h5 class="card-title text-dark">
              {titleCase(repo.repo.replaceAll('-', ' '))}
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">
              <a href={repo.link}>{repo.link}</a>
            </h6>
            <ul>
              <li>
                Language: {repo.language}
              </li>
              {#if repo?.description}
                <li>
                  Description: {repo.description}
                </li>
              {/if}
              {#if repo.stars > 0}
                <li>
                  Stars: {repo.stars}
                </li>
              {/if}
            </ul>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
</style>
