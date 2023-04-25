<script setup lang="ts">
import { fetchFeed } from "@/services/api.service";
import * as dayjs from "dayjs";
import { useRoute } from "vue-router";

const blogs = ref([]);
const route = useRoute();
populateFeed();

watch(
  () => route.path,
  () => {
    populateFeed();
  }
);

function populateFeed() {
  fetchFeed().then((res) => {
    blogs.value = res.data.map((blog) => {
      const uploadDate = dayjs(blog.uploaded_at);
      const today = dayjs();
      const datePosted =
        uploadDate.format("MMM D YYYY") === today.format("MMM D YYYY")
          ? "Today"
          : `${uploadDate.format("MMM D")}`;
      return {
        blogId: blog.id,
        title: blog.title,
        image: blog.image,
        upvotes: blog.upvotes,
        downvotes: blog.downvotes,
        hasUpvoted: blog.user_vote === 1,
        hasDownvoted: blog.user_vote === -1,
        url: blog.link,
        source: blog.source,
        readtime: "1 min read",
        summary: blog.summary,
        tags: blog.tags,
        datePosted,
      };
    });
  });
}

const emit = defineEmits(["open-blog"]);

function openBlog(blogId: any) {
  emit("open-blog", blogId);
}
</script>

<template>
  <div class="flex gap-8 flex-wrap justify-center blog-card-container">
    <BlogCard
      v-for="blog in blogs"
      :key="blog.blogId"
      :title="blog.title"
      :image="blog.image"
      :upvotes="blog.upvotes"
      :downvotes="blog.downvotes"
      :has-upvoted="blog.hasUpvoted"
      :has-downvoted="blog.hasDownvoted"
      :readtime="blog.readtime"
      :url="blog.url"
      :blog-id="blog.blogId"
      :date-posted="blog.datePosted"
      :source="blog.source"
      @click.stop="openBlog(blog.blogId)"
      @refresh="populateFeed"
    />
  </div>
</template>

<style scoped>
.blog-card-container {
  padding-block: 2rem;
  margin-inline: auto;
  max-width: 1440px;
}
</style>
