<template>
    <header ref="header" class="fixed top-0 left-0 right-0 z-50 header-transition" :class="headerClasses">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-4">
                <div class="flex items-center">
                    <a href="/">
                        <img src="/assets/logosuitmedia.png" alt="Suitmedia Logo" class="w-10 h-10 object-contain" />
                    </a>
                </div>

                <nav class="hidden md:flex space-x-8">
                    <a v-for="item in navigation" :key="item.name" href="#"
                        class="text-white hover:text-orange-200 transition-colors duration-200"
                        :class="{ 'border-b-2 border-white pb-1': item.active }"
                        @click.prevent="setActiveNav(item.name)">
                        {{ item.name }}
                    </a>
                </nav>
            </div>
        </div>
    </header>
</template>

<script setup>
    import {
        ref,
        reactive,
        onMounted,
        onUnmounted,
        computed
    } from 'vue'

    const header = ref(null)
    const isScrolled = ref(false)
    const isHidden = ref(false)
    const lastScrollTop = ref(0)

    const navigation = reactive([{
            name: 'Work',
            active: false
        },
        {
            name: 'About',
            active: false
        },
        {
            name: 'Services',
            active: false
        },
        {
            name: 'Ideas',
            active: true
        },
        {
            name: 'Careers',
            active: false
        },
        {
            name: 'Contact',
            active: false
        }
    ])

    const headerClasses = computed(() => ({
        'bg-orange-500': !isScrolled.value,
        'bg-orange-500 bg-opacity-95 backdrop-blur-sm': isScrolled.value,
        'transform -translate-y-full': isHidden.value,
        'transform translate-y-0': !isHidden.value
    }))

    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop

        // Show/hide header based on scroll direction
        if (scrollTop > lastScrollTop.value && scrollTop > 100) {
            isHidden.value = true
        } else {
            isHidden.value = false
        }

        // Change header background when scrolled
        isScrolled.value = scrollTop > 50
        lastScrollTop.value = scrollTop
    }

    const setActiveNav = (name) => {
        navigation.forEach(item => {
            item.active = item.name === name
        })
    }

    onMounted(() => {
        window.addEventListener('scroll', handleScroll, {
            passive: true
        })
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll)
    })

</script>
