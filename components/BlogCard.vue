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

type BlogCardProps = {
  blogId: string;
  title: string;
  image: string;
  url: string;
  readtime: string;
  upvotes: number;
  downvotes: number;
  datePosted: string;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
};
const props = defineProps<BlogCardProps>();

function handleReadMore() {
  window.open(props.url, "_blank", "noopener");
}
</script>

<template>
  <article>
    <BaseCard class="gap-4 cursor-pointer card">
      <div class="flex justify-between">
        <div
          style="
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
            background-color: white;
          "
        ></div>
        <button
          class="read-external flex gap-1 items-center"
          @click.stop="handleReadMore"
        >
          Read More
          <ArrowTopRightOnSquareIcon style="width: 1.25rem" />
        </button>
      </div>
      <h2 class="title">{{ props.title }}</h2>
      <div class="flex flex-col gap-2">
        <div class="flex gap-1 reading-details">
          <span>{{ props.datePosted }}</span>
          <span>•</span>
          <span>{{ props.readtime }}</span>
        </div>
        <div class="image-container">
          <img :src="props.image" :alt="props.title" />
        </div>
      </div>
      <div class="flex justify-between" style="margin-top: 1rem">
        <div class="flex gap-1 items-center action-btn">
          <BaseTooltip :message="props.hasUpvoted ? 'Upvoted' : 'Upvote'">
            <BaseIconButton id="upvote-btn" class="icon-btn">
              <HandThumbUpSolidIcon v-if="props.hasUpvoted" class="upvoted" />
              <HandThumbUpIcon v-else />
            </BaseIconButton>
          </BaseTooltip>
          <span class="icon-btn-text upvote" :class="{ upvoted: hasUpvoted }">{{
            upvotes
          }}</span>
        </div>
        <div class="flex gap-1 items-center action-btn">
          <BaseTooltip :message="props.hasDownvoted ? 'Downvoted' : 'Downvote'">
            <BaseIconButton id="downvote-btn" class="icon-btn">
              <HandThumbDownSolidIcon
                v-if="props.hasDownvoted"
                class="downvoted"
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
  </article>
</template>

<style scoped>
.card {
  padding: 1rem 2rem;
}
.image-container {
  height: 200px;
  margin-inline: -1.25rem;
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

.title {
  margin: 0;
  font-size: 1.5rem;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal;
  line-height: 1.5;
  height: 7rem;
  font-weight: 500;
}

.reading-details {
  color: var(--color-slate-gray);
  font-size: 0.875rem;
  font-weight: 600;
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
  box-shadow: 0px 0px 8px 0px var(--color-slate-gray);
}
</style>
