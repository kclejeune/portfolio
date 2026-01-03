<script lang="ts">
  import { page } from "$app/stores";
</script>

<div class="page-content">
  <div class="min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
    <div class="text-center px-4">
      <div class="card p-10 max-w-sm mx-auto">
        <div class="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          {$page.status}
        </div>
        <h1 class="text-lg font-medium text-slate-900 dark:text-white mb-2">
          {$page.error?.message || "Something went wrong"}
        </h1>
        <p class="text-sm text-slate-600 dark:text-slate-400 mb-6">
          The page you're looking for doesn't exist or an error occurred.
        </p>
        <a
          href="/"
          class="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-colors inline-block"
        >
          Back to Home
        </a>
      </div>
    </div>
  </div>
</div>
