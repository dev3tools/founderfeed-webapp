<script setup lang="ts">
const emit = defineEmits(["overlay-click"]);
</script>

<template>
  <div class="overlay-container">
    <div class="overlay" @click.stop="emit('overlay-click')"></div>
    <slot />
  </div>
</template>
