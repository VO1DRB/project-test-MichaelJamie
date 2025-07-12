<template>
  <div class="flex justify-center items-center space-x-2" v-if="totalPages > 1">
    <button 
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Previous
    </button>
    
    <template v-for="page in visiblePages" :key="page">
      <button 
        v-if="page !== '...'"
        @click="changePage(page)"
        :class="{
          'bg-orange-500 text-white border-orange-500': page === currentPage,
          'border-gray-300 hover:bg-gray-50': page !== currentPage
        }"
        class="px-4 py-2 border rounded-md"
      >
        {{ page }}
      </button>
      <span v-else class="px-2 py-2 text-gray-500">...</span>
    </template>
    
    <button 
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Next
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['change-page'])

const visiblePages = computed(() => {
  const pages = []
  const current = props.currentPage
  const total = props.totalPages

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }

  return pages
})

const changePage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('change-page', page)
  }
}
</script>