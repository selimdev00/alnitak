<template>
  <div class="flex min-h-screen flex-col">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:border focus:border-line focus:bg-surface-1 focus:px-4 focus:py-2 focus:text-content focus:shadow-pop"
    >
      К содержимому
    </a>

    <AppHeader />

    <main id="main" class="flex-1">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>
