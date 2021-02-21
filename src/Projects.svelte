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
  const API_URL = 'https://gh-pinned-repos-5l2i19um3.vercel.app';

  // load pinned github repositories
  let repos = Array<Project>();
  fetch(`${API_URL}/?username=${username}`)
    .then((res) => res.json())
    .then((json: Array<Project>) => {
      repos = json.sort((a: Project, b: Project) => b.stars - a.stars);
    })
    .finally(() => console.log('projects fetched'));

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

<span class="anchor bg-primary" id="projects" />
<div class="projects page bg-light">
  <div class="container">
    <h1 class="header pt-3">Projects</h1>
    <div class="wow fadeIn py-3 my-auto text-dark row">
      {#each repos as repo}
        <div class="col-sm-12">
          <div class="card m-2 wow zoomIn">
            <div class="card-body">
              <h5 class="card-title text-dark">
                {titleCase(repo.repo.replaceAll('-', ' '))}
              </h5>
              <h6 class="card-subtitle mb-2 text-muted">
                <a href={repo.link}>{repo.link}</a>
              </h6>
              {#if repo?.description}
                {repo.description}
              {/if}
              <ul>
                <li>
                  Language: {repo.language}
                </li>
                {#if repo.stars > 0}
                  <li>
                    Stars: {repo.stars}
                  </li>
                {/if}
                {#if repo.forks > 0}
                  <li>
                    Forks: {repo.forks}
                  </li>
                {/if}
              </ul>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
</style>
