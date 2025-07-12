<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <!-- Loading Skeleton -->
    <template v-if="loading">
      <div
        v-for="n in 8"
        :key="n"
        class="rounded-2xl shadow-sm animate-pulse bg-gray-100 overflow-hidden"
      >
        <div class="h-48 bg-gray-300"></div>
        <div class="p-4 space-y-2">
          <div class="h-3 w-1/3 bg-gray-400 rounded"></div>
          <div class="h-4 w-full bg-gray-400 rounded"></div>
          <div class="h-4 w-3/4 bg-gray-400 rounded"></div>
        </div>
      </div>
    </template>

    <!-- Idea Cards -->
    <template v-else>
      <div
        v-for="idea in ideas"
        :key="idea.id"
        class="rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
      >
        <div class="relative h-48 overflow-hidden">
          <template v-if="!imageErrors[idea.id]">
            <img
              :src="idea.small_image || idea.medium_image"
              :alt="idea.title"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              @load="handleImageLoad"
              @error="() => handleImageError(idea.id)"
              loading="lazy"
            />
          </template>
          <template v-else>
            <div class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-sm text-center px-4">
              No Image<br />{{ idea.title }}
            </div>
          </template>
        </div>

        <div class="p-5">
          <p class="text-sm text-gray-500 mb-2">
            {{ formatDate(idea.published_at) }}
          </p>
          <h3
            class="text-lg font-semibold text-gray-800 leading-snug line-clamp-2 min-h-[3.5rem]"
          >
            {{ idea.title }}
          </h3>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

defineProps({
  ideas: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

// Image error tracking per idea.id
const imageErrors = reactive({})

// Handler if image fails to load
const handleImageError = (id) => {
  imageErrors[id] = true
}

// Optional: handle on successful load
const handleImageLoad = (event) => {
  event.target.classList.add('lazy-loaded')
}

// Date formatting
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
