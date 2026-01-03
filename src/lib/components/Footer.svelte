<script lang="ts">
  const currentYear = new Date().getFullYear();
</script>

<footer
  class="py-6 px-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900"
>
  <div
    class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400"
  >
    <p>&copy; {currentYear} Kennan LeJeune</p>
    <div class="flex items-center gap-4">
      <a
        href="https://github.com/kclejeune"
        class="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
      <a
        href="https://linkedin.com/in/kclejeune"
        class="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
      <a
        href="mailto:contact@kclj.io"
        class="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
      >
        Contact
      </a>
    </div>
  </div>
</footer>
