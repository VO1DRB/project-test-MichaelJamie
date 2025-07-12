import { ref, reactive, computed } from 'vue'

export function useIdeas() {
  const ideas = ref([])
  const loading = ref(false)
  const error = ref(null)

  const state = reactive({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    sortBy: '-published_at'
  })

  const itemsInfo = computed(() => {
    const start = (state.currentPage - 1) * state.itemsPerPage + 1
    const end = Math.min(state.currentPage * state.itemsPerPage, state.totalItems)
    return `Showing ${start}-${end} of ${state.totalItems} items`
  })

  const fetchIdeas = async () => {
    loading.value = true
    error.value = null
    
    try {
      const params = new URLSearchParams({
        'page[number]': state.currentPage,
        'page[size]': state.itemsPerPage,
        'append[]': 'small_image',
        'append[]': 'medium_image',
        'sort': state.sortBy
      })

      console.log('Fetching ideas with params:', params.toString())
      
        const response = await fetch(`https://suitmedia-backend.suitdev.com/api/ideas?${params}`, {
        headers: {
            'Accept': 'application/json'
        }
        })

      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      console.log('API Response:', data)
      
      if (data && data.data) {
        ideas.value = data.data
        state.totalItems = data.meta?.total || 0
        state.totalPages = Math.ceil(state.totalItems / state.itemsPerPage)
      } else {
        console.warn('No data found in API response')
        ideas.value = []
        state.totalItems = 0
        state.totalPages = 1
      }
    } catch (err) {
      console.error('Error fetching ideas:', err)
      error.value = err.message
      ideas.value = []
      state.totalItems = 0
      state.totalPages = 1
    } finally {
      loading.value = false
    }
  }

  const changePage = (page) => {
    if (page >= 1 && page <= state.totalPages) {
      state.currentPage = page
      updateURL()
      fetchIdeas()
    }
  }

  const changeItemsPerPage = (size) => {
    state.itemsPerPage = size
    state.currentPage = 1
    updateURL()
    fetchIdeas()
  }

  const changeSort = (sort) => {
    state.sortBy = sort
    state.currentPage = 1
    updateURL()
    fetchIdeas()
  }

  const updateURL = () => {
    const params = new URLSearchParams({
      page: state.currentPage,
      size: state.itemsPerPage,
      sort: state.sortBy
    })
    
    const newUrl = `${window.location.pathname}?${params}`
    window.history.replaceState({}, '', newUrl)
  }

  const initializeFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search)
    
    const page = parseInt(urlParams.get('page')) || 1
    const size = parseInt(urlParams.get('size')) || 10
    const sort = urlParams.get('sort') || '-published_at'
    
    // Validate values
    if ([10, 20, 50].includes(size)) {
      state.itemsPerPage = size
    }
    
    if (['-published_at', 'published_at'].includes(sort)) {
      state.sortBy = sort
    }
    
    state.currentPage = page > 0 ? page : 1
  }

  return {
    ideas,
    loading,
    error,
    state,
    itemsInfo,
    fetchIdeas,
    changePage,
    changeItemsPerPage,
    changeSort,
    initializeFromURL
  }
}