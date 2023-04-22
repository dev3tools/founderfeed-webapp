<script setup lang="ts">
const blogs = [
  {
    title: "Some Blog",
    image:
      "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/d14089fcf09784fc737e695c785c6b89?_a=AQADKdt",
    upvotes: 0,
    downvotes: 0,
    hasUpvoted: false,
    hasDownvoted: false,
    readtime: "10m",
    url: "https://google.com",
    blogId: "somerandomid",
    datePosted: "10 Jan",
  },
  {
    title: "Some Blog",
    image:
      "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/0977660149d460b978bc41ebf864f166",
    upvotes: 0,
    downvotes: 0,
    hasUpvoted: false,
    hasDownvoted: false,
    readtime: "10m",
    url: "https://google.com",
    blogId: "somerandomid",
    datePosted: "10 Jan",
  },
  {
    title: "Some Blog",
    image:
      "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/f226012f1d5a837a81099f9d8ec074d9",
    upvotes: 0,
    downvotes: 0,
    hasUpvoted: false,
    hasDownvoted: false,
    readtime: "10m",
    url: "https://google.com",
    blogId: "somerandomid",
    datePosted: "10 Jan",
  },
  {
    title: "Some Blog",
    image:
      "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/d14089fcf09784fc737e695c785c6b89?_a=AQADKdt",
    upvotes: 0,
    downvotes: 0,
    hasUpvoted: false,
    hasDownvoted: false,
    readtime: "10m",
    url: "https://google.com",
    blogId: "somerandomid",
    datePosted: "10 Jan",
  },
  {
    title: "Some Blog",
    image:
      "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/0977660149d460b978bc41ebf864f166",
    upvotes: 0,
    downvotes: 0,
    hasUpvoted: false,
    hasDownvoted: false,
    readtime: "10m",
    url: "https://google.com",
    blogId: "somerandomid",
    datePosted: "10 Jan",
  },
  {
    title: "Some Blog",
    image:
      "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/f226012f1d5a837a81099f9d8ec074d9",
    upvotes: 0,
    downvotes: 0,
    hasUpvoted: false,
    hasDownvoted: false,
    readtime: "10m",
    url: "https://google.com",
    blogId: "somerandomid",
    datePosted: "10 Jan",
  },
  {
    title: "Some Blog",
    image:
      "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/d14089fcf09784fc737e695c785c6b89?_a=AQADKdt",
    upvotes: 0,
    downvotes: 0,
    hasUpvoted: false,
    hasDownvoted: false,
    readtime: "10m",
    url: "https://google.com",
    blogId: "somerandomid",
    datePosted: "10 Jan",
  },
  {
    title: "Some Blog",
    image:
      "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/0977660149d460b978bc41ebf864f166",
    upvotes: 0,
    downvotes: 0,
    hasUpvoted: false,
    hasDownvoted: false,
    readtime: "10m",
    url: "https://google.com",
    blogId: "somerandomid",
    datePosted: "10 Jan",
  },
  {
    title: "Some Blog",
    image:
      "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/f226012f1d5a837a81099f9d8ec074d9",
    upvotes: 0,
    downvotes: 0,
    hasUpvoted: false,
    hasDownvoted: false,
    readtime: "10m",
    url: "https://google.com",
    blogId: "somerandomid",
    datePosted: "10 Jan",
  },
];
</script>

<template>
  <div class="flex gap-8 flex-wrap blog-card-container">
    <BlogCard
      v-for="blog in blogs"
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
    />
  </div>
</template>

<style scoped>
.blog-card-container {
  padding-block: 2rem;
}
</style>
