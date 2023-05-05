<script setup lang="ts">
import {
  FireIcon,
  FunnelIcon,
  Squares2X2Icon,
  BookmarkIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/vue/24/outline";
import {
  FireIcon as FireSolidIcon,
  FunnelIcon as FunnelSolidIcon,
  Squares2X2Icon as Squares2X2SolidIcon,
  BookmarkIcon as BookmarkSolidIcon,
  MagnifyingGlassCircleIcon as MagnifyingGlassCircleSolidIcon,
} from "@heroicons/vue/24/solid";

const emit = defineEmits(["change"]);

type SidebarOptionsProps = {
  selectedOption?: string;
};
const props = defineProps<SidebarOptionsProps>();

const options = [
  {
    name: "Top Picks",
    slug: "top-picks",
  },
  // {
  //   name: "My Feed",
  //   slug: "my-feed",
  // },
  {
    name: "All Posts",
    slug: "all-posts",
  },
  {
    name: "Search",
    slug: "search",
  },
];

const bookmarks = {
  name: "Bookmarks",
  slug: "bookmarks",
};

const selectedOption = computed(() => {
  const option =
    props.selectedOption === "bookmarks"
      ? bookmarks
      : options.find((option) => option.slug === props.selectedOption);
  return option || { name: "", slug: "" };
});

function handleClick(option: { name: string; slug: string }) {
  emit("change", option.slug);
  navigateTo(`/${option.slug}`);
}
</script>

<template>
  <Head>
    <Title>{{ selectedOption.name }} | FounderFeed.io</Title>
  </Head>
  <nav class="flex flex-col gap-4">
    <span class="sub-heading">Discover</span>
    <div class="flex flex-col gap-1">
      <button
        v-for="option in options"
        :key="option.name"
        :class="{ selected: option.slug === selectedOption.slug }"
        @click="handleClick(option)"
      >
        <FireIcon
          class="btn-icon"
          v-if="
            option.slug === 'top-picks' && selectedOption.slug !== 'top-picks'
          "
        />
        <FireSolidIcon
          class="btn-icon"
          v-if="
            option.slug === 'top-picks' && selectedOption.slug === 'top-picks'
          "
        />
        <FunnelIcon
          class="btn-icon"
          v-if="option.slug === 'my-feed' && selectedOption.slug !== 'my-feed'"
        />
        <FunnelSolidIcon
          class="btn-icon"
          v-if="option.slug === 'my-feed' && selectedOption.slug === 'my-feed'"
        />
        <Squares2X2Icon
          class="btn-icon"
          v-if="
            option.slug === 'all-posts' && selectedOption.slug !== 'all-posts'
          "
        />
        <Squares2X2SolidIcon
          class="btn-icon"
          v-if="
            option.slug === 'all-posts' && selectedOption.slug === 'all-posts'
          "
        />
        <MagnifyingGlassCircleIcon
          class="btn-icon"
          v-if="option.slug === 'search' && selectedOption.slug !== 'search'"
        />
        <MagnifyingGlassCircleSolidIcon
          class="btn-icon"
          v-if="option.slug === 'search' && selectedOption.slug === 'search'"
        />
        {{ option.name }}
      </button>
    </div>
    <span class="sub-heading">Manage</span>
    <div class="flex flex-col gap-1">
      <button
        :class="{ selected: selectedOption.slug === 'bookmarks' }"
        @click.stop="handleClick(bookmarks)"
      >
        <BookmarkSolidIcon
          class="btn-icon"
          v-if="selectedOption.slug === 'bookmarks'"
        />
        <BookmarkIcon class="btn-icon" v-else />
        Bookmarks
      </button>
    </div>
  </nav>
</template>

<style scoped>
.sub-heading {
  font-weight: 600;
  color: slategray;
}

button {
  background: none;
  border: none;
  box-shadow: none;
  border-radius: 1rem;

  padding: 0.75rem 1.25rem;
  width: 100%;
  text-align: left;
  color: slategray;
  font-size: 1rem;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 0.5rem;
}

button:hover {
  background-color: #cccccc20;
  color: var(--color-text);
}

button.selected {
  background-color: #cccccc40;
  color: var(--color-text);
}

.btn-icon {
  width: 1.5rem;
}
</style>
