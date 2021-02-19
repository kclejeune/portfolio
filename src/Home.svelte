<script lang="ts">
</script>

<span class="anchor" id="home" />
<div class="page home">
  <h1 class="wow fadeInUp">Hi, I'm Kennan</h1>
  <span id="icons">
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://github.com/kclejeune"
      class="button m-3"
    >
      <i class="wow fadeInUp fa-2x fab fa-github" />
    </a>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://linkedin.com/in/kclejeune"
      class="button m-3"
    >
      <i class="wow fadeInUp fa-2x fab fa-linkedin" />
    </a>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://keybase.io/kclejeune"
      class="button m-3"
    >
      <i class="wow fadeInUp fa-2x fab fa-keybase" />
    </a>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="mailto:contact@kclj.io"
      class="button m-3"
    >
      <i class="wow fadeInUp fa-2x far fa-envelope" />
    </a>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://kclejeune.keybase.pub/resume.pdf"
      class="button m-3"
    >
      <i class="wow fadeInUp fa-2x far fa-file-alt" />
    </a>
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
      url('../assets/cube.jpg');
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
