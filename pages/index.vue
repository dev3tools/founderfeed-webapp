<script setup lang="ts">
import { useRoute } from "vue-router";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

const pagePath = useRoute().path.replace("/", "");
const selectedOption = ref(pagePath);

function onSidebarOptionChange(ev: string) {
  selectedOption.value = ev;
}
</script>

<template>
  <div class="main-page-layout">
    <header>
      <div class="flex">
        <span class="logo">FounderFeed.co</span>
      </div>
    </header>
    <main>
      <aside>
        <SidebarOptions
          :selected-option="selectedOption"
          @change="onSidebarOptionChange"
        />
        <NuxtPage />
      </aside>
      <div class="content">
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
      </div>
    </main>
  </div>
</template>

<style scoped>
.main-page-layout {
  display: flex;
  flex-direction: column;
}

header {
  display: flex;
  height: 80px;
  align-items: center;
  padding-inline: 2rem;
  border-bottom: 1px solid var(--color-card-border);
}

main {
  display: flex;
}

aside {
  flex: 0 0 240px;
  padding: 2rem;
  border-right: 1px solid var(--color-card-border);
}

.content {
  flex: 1;
  display: block;
  height: calc(100vh - 80px - 4rem);
  height: calc(100dvh - 80px - 4rem);
  padding: 2rem;
  overflow: auto;
}

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

.logo {
  background: linear-gradient(
    to bottom right,
    var(--color-green),
    var(--color-green),
    var(--color-blue),
    var(--color-red)
  );
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: var(--font-secondary);
  font-size: 2.5rem;
}
</style>
