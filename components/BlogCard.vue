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
import {
  addUserVote,
  addBookmark,
  removeBookmark,
} from "@/services/api.service";
import { toast } from "vue3-toastify";

const emit = defineEmits(["refresh"]);

type BlogCardProps = {
  blogId: string | number;
  title: string;
  image: string;
  url: string;
  readtime: string;
  upvotes: number;
  downvotes: number;
  datePosted: string;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  source: string;
  hasBookmarked: boolean;
};
const props = defineProps<BlogCardProps>();

function handleReadMore() {
  window.open(props.url, "_blank", "noopener");
}

async function handleUpvote() {
  await addUserVote(props.blogId, props.hasUpvoted ? 0 : 1);
  emit("refresh");
}

async function handleDownvote() {
  await addUserVote(props.blogId, props.hasDownvoted ? 0 : -1);
  emit("refresh");
}

async function handleBookmark() {
  if (props.hasBookmarked) {
    await removeBookmark(props.blogId);
  } else {
    await addBookmark(props.blogId);
  }
  emit("refresh");
}

async function handleShare() {
  await navigator.clipboard.writeText(
    `https://founderfeed.io/posts/${props.blogId}`
  );
  toast.success("Link copied to clipboard");
}
</script>

<template>
  <article>
    <BaseCard class="gap-2 cursor-pointer card">
      <div class="flex justify-between">
        <img
          :src="props.source"
          style="
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
            background-color: white;
          "
        />
        <button
          class="read-external flex gap-1 items-center"
          @click.stop="handleReadMore"
        >
          Read More
          <ArrowTopRightOnSquareIcon style="width: 1.25rem" />
        </button>
      </div>
      <h2 class="title">{{ props.title }}</h2>
      <div class="flex flex-col gap-1">
        <div class="flex gap-1 reading-details">
          <span>{{ props.datePosted }}</span>
          <!-- <span>•</span>
          <span>{{ props.readtime }}</span> -->
        </div>
        <div class="image-container">
          <img :src="props.image" :alt="props.title" />
        </div>
      </div>
      <div class="flex justify-between" style="margin-top: 0.25rem">
        <div class="flex gap-1 items-center action-btn">
          <BaseTooltip :message="props.hasUpvoted ? 'Upvoted' : 'Upvote'">
            <BaseIconButton
              id="upvote-btn"
              class="icon-btn"
              @click.stop="handleUpvote"
            >
              <HandThumbUpSolidIcon
                v-if="props.hasUpvoted"
                class="upvoted upvoted-icon"
              />
              <HandThumbUpIcon v-else />
            </BaseIconButton>
          </BaseTooltip>
          <span class="icon-btn-text upvote" :class="{ upvoted: hasUpvoted }">{{
            upvotes
          }}</span>
        </div>
        <div class="flex gap-1 items-center action-btn">
          <BaseTooltip
            :message="props.hasDownvoted ? 'Downvoted' : 'Downvote'"
            @click.stop="handleDownvote"
          >
            <BaseIconButton id="downvote-btn" class="icon-btn">
              <HandThumbDownSolidIcon
                v-if="props.hasDownvoted"
                class="downvoted downvoted-icon"
              />
              <HandThumbDownIcon v-else />
            </BaseIconButton>
          </BaseTooltip>
          <span
            class="icon-btn-text downvote"
            :class="{ downvoted: hasDownvoted }"
            >{{ downvotes }}</span
          >
        </div>
        <BaseTooltip message="Bookmark">
          <BaseIconButton
            id="bookmark-btn"
            class="icon-btn"
            @click.stop="handleBookmark"
          >
            <BookmarkSolidIcon
              :class="{ bookmarked: props.hasBookmarked }"
              v-if="props.hasBookmarked"
            />
            <BookmarkIcon v-else />
          </BaseIconButton>
        </BaseTooltip>
        <BaseTooltip message="Share">
          <BaseIconButton
            id="share-btn"
            class="icon-btn"
            @click.stop="handleShare"
          >
            <PaperAirplaneIcon />
          </BaseIconButton>
        </BaseTooltip>
      </div>
    </BaseCard>
  </article>
</template>

<style scoped>
.card {
  padding: 1rem 1.5rem;
}

.card:where(:hover, :focus-visible) {
  border-color: var(--color-card-border);
  box-shadow: 1px 1px 20px 0px var(--color-slate-gray-opacity);
}
.image-container {
  height: 200px;
  margin-inline: -1rem;
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

.bookmarked {
  color: var(--color-yellow);
  animation: bookmark 0.3s ease;
}

.upvoted-icon {
  animation: upvote 0.3s ease-in-out;
  transform-origin: 0;
}

.downvoted-icon {
  animation: downvote 0.3s ease-in-out;
  transform-origin: 0;
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

.downvoted,
.action-btn:hover .downvote {
  color: var(--color-red);
}

.title {
  margin: 0;
  font-size: 1.25rem;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: normal;
  line-height: 1.5;
  height: 2rem;
  font-weight: 500;
}

.reading-details {
  color: var(--color-slate-gray);
  font-size: 0.875rem;
  font-weight: 500;
}

.read-external {
  background-color: var(--color-text);
  color: var(--color-bg);
  border-radius: 1rem;
  border: none;
  box-shadow: none;
  opacity: 0;
  will-change: opacity;
  transition: opacity 0.2s ease;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.card:where(:hover, :focus-visible) .read-external {
  opacity: 1;
}

.read-external:hover {
  box-shadow: 0px 0px 8px 0px var(--color-slate-gray-opacity);
}
</style>
