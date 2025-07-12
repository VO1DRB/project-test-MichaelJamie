<template>
  <section class="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
    <!-- Background Image -->
    <div
      class="absolute inset-0 bg-cover bg-center"
      :style="{ backgroundImage: 'url(/assets/banner.jpg)' }"
    >
      <div class="absolute inset-0 bg-black opacity-50" />
    </div>

    <!-- Text -->
    <div class="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
      <h1 class="text-4xl sm:text-5xl font-bold">Ideas</h1>
      <p class="mt-2 text-lg sm:text-xl font-light">Where all our great things begin</p>
    </div>

    <!-- Slanted bottom shape -->
    <div class="absolute bottom-0 left-0 w-full h-16 bg-white rotate-2 origin-bottom-left" />
  </section>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const bannerBg = ref(null)
const parallaxOffset = ref(0)

const handleScroll = () => {
  const scrollTop = window.pageYOffset
  parallaxOffset.value = scrollTop * 0.5
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>