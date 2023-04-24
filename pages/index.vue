<script setup lang="ts">
import { useRoute } from "vue-router";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

const pagePath = useRoute().path.replace("/", "");
const selectedOption = ref(pagePath);
</script>

<template>
  <NuxtLayout name="loggedin">
    <TransitionFade>
      <div v-if="selectedOption === 'search'">
        <form class="flex flex-grow">
          <div class="input-group">
            <MagnifyingGlassIcon class="input-icon" />
            <input
              type="text"
              placeholder="Search posts"
              class="search-input"
            />
          </div>
        </form>
      </div>
    </TransitionFade>
    <CuratedFeed />
  </NuxtLayout>
</template>

<style scoped>
.input-group {
  width: calc(100% - 2rem);
  padding: 1rem;
  border: 1px solid var(--color-card-border);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.input-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--color-grey);
}

.search-input {
  flex-grow: 1;
  background: transparent;
  font-size: 1rem;
  outline: none;
  color: var(--color-text);
  border: none;
  box-shadow: none;
}

.input-group:has(:focus-within) {
  outline: 1px solid var(--color-text);
}
</style>
