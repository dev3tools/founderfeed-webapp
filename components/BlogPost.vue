<script setup lang="ts">
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  PaperAirplaneIcon,
  BookmarkIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/vue/24/outline";
import {
  HandThumbUpIcon as HandThumbUpSolidIcon,
  HandThumbDownIcon as HandThumbDownSolidIcon,
  BookmarkIcon as BookmarkSolidIcon,
} from "@heroicons/vue/24/solid";
import * as dayjs from "dayjs";
import { fetchPostById } from "@/services/api.service";

type BlogPostProps = {
  blogId: string;
};
const props = defineProps<BlogPostProps>();

const blog = ref({});

fetchPostById(props.blogId).then((res) => {
  const fetchedBlog = res.data;
  const uploadDate = dayjs(fetchedBlog.uploaded_at);
  const today = dayjs();
  const datePosted =
    uploadDate.format("MMM D YYYY") === today.format("MMM D YYYY")
      ? "Today"
      : `${uploadDate.format("MMM D")}`;
  blog.value = {
    blogId: fetchedBlog.id,
    title: fetchedBlog.title,
    image: fetchedBlog.image,
    upvotes: fetchedBlog.upvotes,
    downvotes: fetchedBlog.downvotes,
    hasUpvoted: fetchedBlog.user_vote === 1,
    hasDownvoted: fetchedBlog.user_vote === -1,
    url: fetchedBlog.link,
    source: fetchedBlog.source,
    readtime: "1 min read",
    summary: fetchedBlog.summary,
    tags: fetchedBlog.tags,
    datePosted,
  };
});

function handleReadMore() {
  window.open(blog.url, "_blank", "noopener");
}
</script>

<template>
  <div class="blog">
    <main class="flex flex-col gap-8">
      <h2 class="title">
        {{ blog.title }}
      </h2>
      <div>
        <button
          class="read-external flex gap-1 items-center"
          @click.stop="handleReadMore"
        >
          Read the blog
          <ArrowTopRightOnSquareIcon style="width: 1.25rem" />
        </button>
      </div>
      <div class="blog-summary">
        <span class="tldr">TLDR;</span> {{ blog.summary }}
      </div>
      <div class="flex gap-4">
        <BaseChip v-for="tag in blog.tags" :key="tag">{{ tag }}</BaseChip>
      </div>
      <div class="flex gap-1 reading-details">
        <span>{{ blog.datePosted }}</span>
        <!-- <span>•</span>
        <span>15m readtime</span> -->
      </div>
      <div class="image-container">
        <img :src="blog.image" :alt="blog.title" />
      </div>
      <BaseCard style="width: auto; padding: 0.5rem 1rem">
        <div class="flex justify-between items-center">
          <div class="flex gap-1 items-center action-btn">
            <BaseTooltip :message="'Upvote'">
              <BaseIconButton id="upvote-btn" class="icon-btn">
                <HandThumbUpSolidIcon v-if="blog.hasUpvoted" class="upvoted" />
                <HandThumbUpIcon v-else />
              </BaseIconButton>
            </BaseTooltip>
            <span class="icon-btn-text upvote">{{ blog.upvotes }}</span>
          </div>
          <div class="flex gap-1 items-center action-btn">
            <BaseTooltip :message="'Downvote'">
              <BaseIconButton id="downvote-btn" class="icon-btn">
                <HandThumbDownSolidIcon
                  v-if="blog.hasDownvoted"
                  class="downvoted"
                />
                <HandThumbDownIcon v-else />
              </BaseIconButton>
            </BaseTooltip>
            <span class="icon-btn-text downvote">{{ blog.downvotes }}</span>
          </div>
          <BaseTooltip message="Bookmark">
            <BaseIconButton id="bookmark-btn" class="icon-btn">
              <BookmarkIcon />
            </BaseIconButton>
          </BaseTooltip>
          <BaseTooltip message="Share">
            <BaseIconButton id="share-btn" class="icon-btn">
              <PaperAirplaneIcon />
            </BaseIconButton>
          </BaseTooltip>
        </div>
      </BaseCard>
    </main>
    <aside></aside>
  </div>
</template>

<style scoped>
.blog {
  padding: 2.5rem;
  max-width: 768px;
  margin: 0 auto;
}
.title {
  margin: 0;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 500;
}
.reading-details {
  color: var(--color-slate-gray);
  font-size: 0.875rem;
  font-weight: 500;
}

.blog-summary {
  font-size: 1rem;
  line-height: 1.5;
  border-left: 4px solid var(--color-green);
  padding-left: 2rem;
  padding-block: 0.25rem;
}

.tldr {
  color: var(--color-green);
  font-weight: 500;
  margin-right: 0.5rem;
}

.image-container {
  max-width: 400px;
  border-radius: 0.5rem;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.action-btn {
  cursor: pointer;
}

.icon-btn * {
  width: 1.75rem;
  aspect-ratio: 1/1;
}

.icon-btn-text {
  font-weight: 800;
}

.action-btn:hover #upvote-btn {
  background-color: var(--color-green-opacity);
  color: var(--color-green);
}

.action-btn:hover #downvote-btn {
  background-color: var(--color-red-opacity);
  color: var(--color-red);
}

#share-btn:hover {
  background-color: var(--color-blue-opacity);
  color: var(--color-blue);
}

#bookmark-btn:hover {
  background-color: var(--color-yellow-opacity);
  color: var(--color-yellow);
}

.upvoted,
.action-btn:hover .upvote {
  color: var(--color-green);
}

.downvoted,
.action-btn:hover .downvote {
  color: var(--color-red);
}

.read-external {
  background-color: transparent;
  color: var(--color-text);
  border-radius: 1rem;
  border: 2px solid var(--color-text);
  box-shadow: none;
  transition: background-color 0.2s ease, color 0.2s ease;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.read-external:hover {
  background-color: var(--color-text);
  color: var(--color-bg);
}
</style>
