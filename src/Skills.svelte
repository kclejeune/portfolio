<script lang="ts">
  const title: string = 'Technologies I Use';
  const skills: Array<string> = [
    'Python',
    'Scikit-Learn',
    'Tensorflow',
    'Keras',
    'NixOS',
    'Bash',
    'Awk',
    'TypeScript',
    'Javascript',
    'Angular',
    'Vue',
    'Svelte',
    'HTML',
    'CSS',
    'Java',
    'Kotlin',
    'SQL',
    'Scheme',
  ];
</script>

<span class="anchor bg-dark" id="technologies" />
<div class="technologies page bg-dark">
  <div class="container">
    <h1 class="header pt-3 text-light">{title}</h1>
    <div class="py-3 wow fadeIn text-dark row justify-content-center">
      {#each skills as skill}
        <div class="col-xl-3 col-lg-4 col-sm-6">
          <div class="m-2 card wow zoomIn">
            <div class="card-body">
              <h2 class="header">{skill}</h2>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
