<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const selectedBlogId = route.params.id;
</script>

<template>
  <NuxtLayout name="loggedin">
    <BlogPost :blog-id="selectedBlogId" />
  </NuxtLayout>
</template>
