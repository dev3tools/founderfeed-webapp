<script setup lang="ts">
type BlogPostProps = {
  blogId: string;
};
const props = defineProps<BlogPostProps>();
</script>

<template>
  <div>{{ props.blogId }}</div>
</template>
