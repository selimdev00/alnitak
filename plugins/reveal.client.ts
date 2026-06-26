// Global `v-reveal` directive: fades/raises elements in on first view.
// Respects reduced-motion and degrades to "always visible".
export default defineNuxtPlugin((nuxtApp) => {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const supported =
    typeof IntersectionObserver !== 'undefined' && !reduce

  const io = supported
    ? new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in')
              io!.unobserve(entry.target)
            }
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
      )
    : null

  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding) {
      if (!io) {
        el.classList.add('is-in')
        return
      }
      el.classList.add('reveal')
      const delay = binding.value?.delay
      if (typeof delay === 'number') el.style.transitionDelay = `${delay}ms`
      io.observe(el)
    },
    unmounted(el: HTMLElement) {
      io?.unobserve(el)
    },
  })
})
