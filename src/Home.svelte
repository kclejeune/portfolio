<script lang="ts">
  type Icon = {
    link: string;
    iconClass: string;
  };
  const icons: Array<Icon> = [
    {
      link: 'https://github.com/kclejeune',
      iconClass: 'fa-2x fab fa-github',
    },
    {
      link: 'https://linkedin.com/in/kclejeune',
      iconClass: 'fa-2x fab fa-linkedin',
    },
    {
      link: 'https://keybase.io/kclejeune',
      iconClass: 'fa-2x fab fa-keybase',
    },
    {
      link: 'mailto:contact@kclj.io',
      iconClass: 'fa-2x far fa-envelope',
    },
    {
      link: 'https://kclejeune.keybase.pub/resume.pdf',
      iconClass: 'fa-2x far fa-file-alt',
    },
  ];
</script>

<span class="anchor" id="home" />
<div class="page home">
  <h1 class="wow fadeInUp">Hi, I'm Kennan</h1>
  <span id="icons">
    {#each icons as icon}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={icon.link}
        class="button m-3"
      >
        <i class="wow fadeInUp {icon.iconClass}" />
      </a>
    {/each}
  </span>
  <a id="down" class="button my-5" href="#about">
    <i class="wow fadeInUp fas fa-chevron-circle-down fa-2x" />
  </a>
</div>

<style>
  /* homescreen theme */
  * {
    color: lightskyblue;
  }
  .page {
    /* The image used */
    background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.6) 0%,
        rgba(0, 0, 0, 0.6) 100%
      ),
      url('/assets/cube.jpg');
    background-color: rgba(0, 0, 0, 0.6);
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  /* decrease font size and turn off parallax on phones and tablets*/
  @media screen and (max-device-width: 1366px) {
    .page {
      background-attachment: scroll;
    }
  }

  /* pretty colors on hover if we aren't using a touchscreen */
  @media (hover: hover) {
    i:hover {
      color: steelblue;
    }
  }
</style>
