<template>
  <IdeasLayout>
    <div class="min-h-screen bg-gray-50">
      <Header />
      <Banner />
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="mb-8">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div class="text-sm text-gray-600">
              {{ itemsInfo }}
            </div>
            <div class="flex flex-col sm:flex-row gap-4">
              <div class="flex items-center gap-2">
                <label for="itemsPerPage" class="text-sm text-gray-600">Show per page:</label>
                <select
                  id="itemsPerPage"
                  :value="state.itemsPerPage"
                  @change="changeItemsPerPage(parseInt($event.target.value))"
                  class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
              <div class="flex items-center gap-2">
                <label for="sortBy" class="text-sm text-gray-600">Sort by:</label>
                <select
                  id="sortBy"
                  :value="state.sortBy"
                  @change="changeSort($event.target.value)"
                  class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="-published_at">Newest</option>
                  <option value="published_at">Oldest</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <IdeasGrid :ideas="ideas" :loading="loading" />
        
        <Pagination
          :current-page="state.currentPage"
          :total-pages="state.totalPages"
          @change-page="changePage"
        />
      </main>
    </div>
  </IdeasLayout>
</template>

<script setup>
import IdeasLayout from '@/Layouts/IdeasLayout.vue'
import Header from '@/Components/Header.vue'
import Banner from '@/Components/Banner.vue'
import IdeasGrid from '@/Components/IdeasGrid.vue'
import Pagination from '@/Components/Pagination.vue'
import { useIdeas } from '@/composables/useIdeas.js'
import { onMounted } from 'vue'

const {
  ideas,
  loading,
  error,
  state,
  itemsInfo,
  fetchIdeas,
  initializeFromURL,
  changePage,
  changeItemsPerPage,
  changeSort
} = useIdeas()

onMounted(() => {
  initializeFromURL()
  fetchIdeas()
})
</script>