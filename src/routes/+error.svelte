<script lang="ts">
  import { page } from "$app/state";
</script>

<div class="page-content">
  <div class="flex min-h-[calc(100dvh-3.5rem)] items-center justify-center px-4">
    <div class="card mx-auto max-w-sm p-10 text-center">
      <div
        class="bg-gradient-to-br from-primary-500 to-primary-700 bg-clip-text text-5xl font-bold text-transparent"
      >
        {page.status}
      </div>
      <h1 class="mt-3 mb-2 text-lg font-medium text-slate-900 dark:text-white">
        {page.error?.message || "Something went wrong"}
      </h1>
      <p class="mb-6 text-sm text-slate-600 dark:text-slate-400">
        The page you're looking for doesn't exist or an error occurred.
      </p>
      <a href="/" class="btn">Back to Home</a>
    </div>
  </div>
</div>
