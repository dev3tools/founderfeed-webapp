<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const selectedBlogId = route.params.id;
</script>

<template>
  <NuxtLayout name="loggedin">
    <BlogPost :blog-id="selectedBlogId" class="blog-post" />
  </NuxtLayout>
</template>

<style scoped>
.blog-post {
  border: 1px solid var(--color-card-border);
  border-radius: 1rem;
}
</style>
