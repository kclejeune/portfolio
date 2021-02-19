<script lang="ts">
  export const title: string = 'Technologies I Use';
  export const skills: Array<string> = [
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
    <div class="py-3 wow fadeIn text-dark cards">
      {#each skills as skill}
        <div class="m-2 card wow zoomIn">
          <div class="card-body">
            <h2 class="header">{skill}</h2>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
