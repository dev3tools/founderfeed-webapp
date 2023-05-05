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
import dayjs from "dayjs";
import {
  fetchPostById,
  fetchTags,
  addUserVote,
  addBookmark,
  removeBookmark,
} from "@/services/api.service";
import { toast } from "vue3-toastify";

type BlogPostProps = {
  blogId: string;
};
const props = defineProps<BlogPostProps>();

const blog = ref({});
let tags = [];
const error = ref(false);

fetchTags().then((res) => {
  tags = res.data;
  fetchPost();
});

function fetchPost() {
  fetchPostById(props.blogId)
    .then((res) => {
      const fetchedBlog = res.data;
      const uploadDate = dayjs(fetchedBlog.uploaded_at);
      const today = dayjs();
      const datePosted =
        uploadDate.format("MMM D YYYY") === today.format("MMM D YYYY")
          ? "Today"
          : `${uploadDate.format("MMM D")}`;
      const blogTags: string[] = [];
      fetchedBlog.tags.forEach((tag) => {
        const tagObj = tags.find((t) => t.id === tag);
        if (tagObj) {
          blogTags.push(tagObj.name);
        }
      });
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
        tags: blogTags,
        datePosted,
        hasBookmarked: fetchedBlog.bookmarked,
      };
      document.title = `${blog.value.title} | FounderFeed.io`;
    })
    .catch((e) => {
      console.log(e);
      if (e.response.status === 404) {
        toast.error("Blog not found");
        error.value = 404;
        document.title = `Blog not found | FounderFeed.io`;
      } else {
        toast.error("Something went wrong");
        error.value = true;
        document.title = `Error | FounderFeed.io`;
      }
    });
}

async function handleUpvote() {
  await addUserVote(blog.value.blogId, blog.value.hasUpvoted ? 0 : 1);
  fetchPost();
}

async function handleDownvote() {
  await addUserVote(blog.value.blogId, blog.value.hasDownvoted ? 0 : -1);
  fetchPost();
}

async function handleBookmark() {
  if (blog.value.hasBookmarked) {
    await removeBookmark(props.blogId);
  } else {
    await addBookmark(props.blogId);
  }
  fetchPost();
}

function handleReadMore() {
  window.open(blog.value.url, "_blank", "noopener");
}
</script>

<template>
  <TransitionFade>
    <div v-if="blog.blogId" class="blog">
      <main class="flex flex-col gap-4">
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
            <div
              class="flex gap-1 items-center action-btn"
              @click.stop="handleUpvote"
            >
              <BaseTooltip :message="'Upvote'">
                <BaseIconButton
                  id="upvote-btn"
                  class="icon-btn"
                  @click.stop="handleUpvote"
                >
                  <HandThumbUpSolidIcon
                    v-if="blog.hasUpvoted"
                    class="upvoted upvoted-icon"
                  />
                  <HandThumbUpIcon v-else />
                </BaseIconButton>
              </BaseTooltip>
              <span
                class="icon-btn-text upvote"
                :class="{ upvoted: blog.hasUpvoted }"
                >{{ blog.upvotes
                }}<span class="hide-tablet" style="margin-left: 0.375rem">{{
                  blog.upvotes === 1 ? "Upvote" : "Upvotes"
                }}</span></span
              >
            </div>
            <div
              class="flex gap-1 items-center action-btn"
              @click.stop="handleDownvote"
            >
              <BaseTooltip :message="'Downvote'">
                <BaseIconButton
                  id="downvote-btn"
                  class="icon-btn"
                  @click.stop="handleDownvote"
                >
                  <HandThumbDownSolidIcon
                    v-if="blog.hasDownvoted"
                    class="downvoted downvoted-icon"
                  />
                  <HandThumbDownIcon v-else />
                </BaseIconButton>
              </BaseTooltip>
              <span
                class="icon-btn-text downvote"
                :class="{ downvoted: blog.hasDownvoted }"
                >{{ blog.downvotes
                }}<span class="hide-tablet" style="margin-left: 0.375rem">{{
                  blog.downvotes === 1 ? "Downvote" : "Downvotes"
                }}</span></span
              >
            </div>
            <div
              class="flex gap-1 items-center action-btn"
              @click.stop="handleBookmark"
            >
              <BaseTooltip message="Bookmark">
                <BaseIconButton
                  id="bookmark-btn"
                  class="icon-btn"
                  @click.stop="handleBookmark"
                >
                  <BookmarkSolidIcon
                    :class="{
                      'bookmarked bookmarked-icon': blog.hasBookmarked,
                    }"
                    v-if="blog.hasBookmarked"
                  />
                  <BookmarkIcon v-else />
                </BaseIconButton>
              </BaseTooltip>
              <span
                class="icon-btn-text bookmark hide-tablet"
                :class="{ bookmarked: blog.hasBookmarked }"
                >{{ blog.hasBookmarked ? "Bookmarked" : "Bookmark" }}</span
              >
            </div>
            <div class="flex gap-1 items-center action-btn">
              <BaseTooltip message="Share">
                <BaseIconButton id="share-btn" class="icon-btn">
                  <PaperAirplaneIcon />
                </BaseIconButton>
              </BaseTooltip>
              <span class="icon-btn-text share hide-tablet">Share</span>
            </div>
          </div>
        </BaseCard>
      </main>
      <aside></aside>
    </div>
    <div v-else>
      <div v-if="error === 404">
        <h2>Blog not found</h2>
      </div>
      <div v-else-if="error">
        <h2>Something went wrong</h2>
      </div>
      <div v-else>
        <h2>Loading...</h2>
      </div>
    </div>
  </TransitionFade>
</template>

<style scoped>
.blog {
  padding: 2rem;
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
  max-width: 480px;
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

.action-btn:hover #share-btn {
  background-color: var(--color-blue-opacity);
  color: var(--color-blue);
}

.action-btn:hover .share {
  color: var(--color-blue);
}

.action-btn:hover #bookmark-btn {
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

.upvoted-icon {
  animation: upvote 0.3s ease-in-out;
  transform-origin: 0;
}

.downvoted-icon {
  animation: downvote 0.3s ease-in-out;
  transform-origin: 0;
}

.bookmarked,
.action-btn:hover .bookmark {
  color: var(--color-yellow);
}

.bookmarked-icon {
  animation: bookmark 0.3s ease;
}

@keyframes bookmark {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes upvote {
  0% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.25) rotate(-45deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

@keyframes downvote {
  0% {
    transform: scale(1) translateX(0);
  }
  15% {
    transform: scale(1) translateX(-0.25rem);
  }
  30% {
    transform: scale(1) translateX(0);
  }
  45% {
    transform: scale(1) translateX(0.25rem);
  }
  70% {
    transform: scale(1) translateX(0);
  }
  85% {
    transform: scale(1) translateX(-0.25rem);
  }
  100% {
    transform: scale(1) translateX(0);
  }
}

@media screen and (max-width: 1023px) {
  .hide-tablet {
    display: none;
  }
}
</style>
