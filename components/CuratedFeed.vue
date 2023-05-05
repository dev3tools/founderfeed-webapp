<script setup lang="ts">
import { fetchFeed, getTags, getBookmarks } from "@/services/api.service";
import dayjs from "dayjs";
import { useRoute } from "vue-router";

type FeedProps = {
  search?: string;
};

const props = defineProps<FeedProps>();

const blogs = ref([]);
const route = useRoute();
populateFeed();

watch(
  () => route.path,
  () => {
    populateFeed();
  }
);

watch(
  () => props.search,
  () => {
    populateFeed();
  }
);

function populateFeed() {
  const feedOptions = {};
  if (route.path === "/top-picks") {
    feedOptions["day"] = new Date().toISOString().split("T")[0];
  }
  if (route.path === "/search" && props.search) {
    feedOptions["title"] = props.search;
  }
  if (route.path === "/bookmarks") {
    getBookmarks().then((res) => {
      blogs.value = res.data.map((bookmark) => {
        const blog = bookmark.feed;
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
          hasBookmarked: blog.bookmarked,
        };
      });
    });
    return;
  }
  fetchFeed(feedOptions).then((res) => {
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
        hasBookmarked: blog.bookmarked,
      };
    });
  });
  if (route.path === "/search" && props.search) {
    getTags(props.search).then((tagsRes) => {
      if (tagsRes.data?.length) {
        const tagIds = tagsRes.data.map((tag) => tag.id).join(",");
        fetchFeed({ tags: tagIds }).then((res) => {
          blogs.value = [
            ...blogs.value,
            ...res.data
              .filter((blog) => {
                return !blogs.value.find((b) => b.blogId === blog.id);
              })
              .map((blog) => {
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
                  hasBookmarked: blog.bookmarked,
                };
              }),
          ];
        });
      }
    });
  }
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
      :has-bookmarked="blog.hasBookmarked"
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
