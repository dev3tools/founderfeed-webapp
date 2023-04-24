<script setup lang="ts">
import { useRoute } from "vue-router";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/vue/24/outline";

const route = useRoute();
const selectedOption = ref(route.path.replace("/", ""));
const searchInput = ref(null);
const searchQuery = ref("");

function handleMenuChange(ev) {
  selectedOption.value = ev;
}
</script>

<template>
  <NuxtLayout name="loggedin" @menu-change="handleMenuChange">
    <TransitionFade>
      <div v-if="selectedOption === 'search'">
        <form class="flex flex-grow" @submit.prevent="void 0">
          <div class="input-group" @click.stop="searchInput.focus()">
            <MagnifyingGlassIcon class="input-icon" />
            <input
              type="text"
              placeholder="Search posts"
              class="search-input"
              ref="searchInput"
              v-model="searchQuery"
            />
            <TransitionFade>
              <BaseIconButton
                v-if="searchQuery.trim()"
                class="input-icon-end-btn"
                @click="searchQuery = ''"
              >
                <XMarkIcon class="input-icon-end" />
              </BaseIconButton>
            </TransitionFade>
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
  cursor: text;
}

.input-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--color-grey);
}

.input-icon-end-btn {
  padding: 0;
}

.input-icon-end {
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
