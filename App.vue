<script setup lang="ts">
import "vue3-toastify/dist/index.css";
</script>

<template>
  <NuxtPage />
</template>

<style>
::root {
  --toastify-text-color-info: var(--toastify-color-info);
  --toastify-text-color-success: var(--toastify-color-success);
  --toastify-text-color-warning: var(--toastify-color-warning);
  --toastify-text-color-error: var(--toastify-color-error);
}
</style>
