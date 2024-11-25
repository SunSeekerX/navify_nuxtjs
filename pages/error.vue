// error.vue
<template>
  <div class="error-page">
    <h1>{{ error.statusCode }}</h1>
    <div class="error-desc">{{ error.message }}</div>
    <NuxtLink to="/">返回首页</NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  error: Object,
})
</script>
