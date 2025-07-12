<template>
  <div class="min-h-screen bg-gray-50">
    <slot />
  </div>
</template>

<script setup>
// Basic layout component for Ideas pages
</script>

<style scoped>
/* Add any layout-specific styles here */
.header-transition {
  transition: all 0.3s ease-in-out;
}

.parallax-bg {
  background-image: url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.card-hover {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.lazy-loading {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.lazy-loaded {
  opacity: 1;
}

.text-ellipsis-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
}
</style>