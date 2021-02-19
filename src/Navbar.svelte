<script lang="ts">
  export const pages = [
    {
      page: 'home',
      title: 'Home',
    },
    {
      page: 'about',
      title: 'About Me',
    },
    {
      page: 'experience',
      title: 'Experience',
    },
    {
      page: 'projects',
      title: 'Projects',
    },
    {
      page: 'technologies',
      title: 'Skills',
    },
  ];
</script>

<!-- Navbar -->
<nav class="navbar fixed-top navbar-expand-lg navbar-dark elegant-color">
  <a class="navbar-brand button" href="#home">Kennan LeJeune</a>
  <button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon" />
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav nav-pills mr-auto">
      {#each pages as page}
        <li
          class="nav-item"
          data-toggle="collapse"
          data-target=".navbar-collapse.show"
        >
          <a class="nav-link" href="#{page.page}">{page.title}</a>
        </li>
      {/each}
    </ul>
  </div>
</nav>
