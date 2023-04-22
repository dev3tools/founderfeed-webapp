<script setup lang="ts">
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  PaperAirplaneIcon,
} from "@heroicons/vue/24/outline";
import {
  HandThumbUpIcon as HandThumbUpSolidIcon,
  HandThumbDownIcon as HandThumbDownSolidIcon,
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
</script>

<template>
  <article>
    <BaseCard class="gap-4 cursor-pointer">
      <h2>{{ props.title }}</h2>
      <div class="image-container">
        <img :src="props.image" :alt="props.title" />
      </div>
      <div class="flex justify-between">
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
.image-container {
  height: 200px;
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

.upvoted,
.action-btn:hover .upvote {
  color: var(--color-green);
}

.downvoted,
.action-btn:hover .downvote {
  color: var(--color-red);
}
</style>
