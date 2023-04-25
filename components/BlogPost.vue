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

type BlogPostProps = {
  blogId: string;
};
const props = defineProps<BlogPostProps>();

function handleReadMore() {
  window.open("https://google.com", "_blank", "noopener");
}
</script>

<template>
  <div class="blog">
    <main class="flex flex-col gap-8">
      <h2 class="title">
        ECMAScript ES6+: A Comprehensive Guide to Modern JavaScript
      </h2>
      <div>
        <button
          class="read-external flex gap-1 items-center"
          @click.stop="handleReadMore"
        >
          Read More
          <ArrowTopRightOnSquareIcon style="width: 1.25rem" />
        </button>
      </div>
      <div class="blog-summary">
        <span class="tldr">TLDR</span> JavaScript has come a long way since its
        inception, and ES6+ represents a massive leap forward in terms of
        features and ease of use. In this article, we'll introduce you to the
        modern era of JavaScript development by exploring some of the most
        significant enhancements introduced in ES6+. Let’s dive into this
        fantastic journey together.
      </div>
      <div class="flex gap-4">
        <BaseChip>#SaaS</BaseChip>
        <BaseChip>#Pricing</BaseChip>
      </div>
      <div class="flex gap-1 reading-details">
        <span>Apr 18</span>
        <span>•</span>
        <span>15m readtime</span>
      </div>
      <div class="image-container">
        <img
          src="https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/f226012f1d5a837a81099f9d8ec074d9"
          alt="Blog"
        />
      </div>
      <BaseCard style="width: auto; padding: 0.5rem 1rem">
        <div class="flex justify-between items-center">
          <div class="flex gap-1 items-center action-btn">
            <BaseTooltip :message="'Upvote'">
              <BaseIconButton id="upvote-btn" class="icon-btn">
                <!-- <HandThumbUpSolidIcon v-if="props.hasUpvoted" class="upvoted" /> -->
                <HandThumbUpIcon />
              </BaseIconButton>
            </BaseTooltip>
            <span class="icon-btn-text upvote">18</span>
          </div>
          <div class="flex gap-1 items-center action-btn">
            <BaseTooltip :message="'Downvote'">
              <BaseIconButton id="downvote-btn" class="icon-btn">
                <!-- <HandThumbDownSolidIcon
                  v-if="props.hasDownvoted"
                  class="downvoted"
                /> -->
                <HandThumbDownIcon />
              </BaseIconButton>
            </BaseTooltip>
            <span class="icon-btn-text downvote">10</span>
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
  font-weight: 600;
}

.blog-summary {
  font-size: 1rem;
  line-height: 1.5;
  border-left: 2px solid var(--color-green);
  padding-left: 2rem;
  padding-block: 0.5rem;
}

.tldr {
  color: var(--color-green);
  font-weight: 500;
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
