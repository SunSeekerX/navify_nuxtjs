<template>
  <div>
    <h1>Error Page</h1>
    <p>{{ error.message }}</p>
    <button @click="$router.push('/')">Go Home</button>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
