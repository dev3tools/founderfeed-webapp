<script setup lang="ts">
import { useRoute } from "vue-router";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";

const pagePath = useRoute().path.replace("/", "");
const selectedOption = ref(pagePath);
const sidebarExpanded = ref(false);

function onSidebarOptionChange(ev: string) {
  selectedOption.value = ev;
}
</script>

<template>
  <div class="main-page-layout">
    <header>
      <div class="flex gap-4 items-center">
        <BaseIconButton
          class="menu-icon-button"
          :class="{ expanded: sidebarExpanded }"
          @click.stop="sidebarExpanded = !sidebarExpanded"
        >
          <Bars3Icon class="menu-icon" v-if="!sidebarExpanded" />
          <XMarkIcon class="menu-icon" v-else />
        </BaseIconButton>
        <span class="logo">FounderFeed.co</span>
      </div>
    </header>
    <main>
      <aside class="desktop-sidebar">
        <SidebarOptions
          :selected-option="selectedOption"
          @change="onSidebarOptionChange"
        />
        <NuxtPage />
      </aside>
      <div class="content">
        <slot />
      </div>
    </main>
    <TransitionSlide>
      <div class="overlay-container" v-if="sidebarExpanded">
        <div class="overlay"></div>
        <aside
          class="overlay-content mobile-sidebar flex flex-col"
          :class="{ expanded: sidebarExpanded }"
        >
          <header>
            <div class="flex gap-4 items-center">
              <BaseIconButton
                class="menu-icon-button"
                :class="{ expanded: sidebarExpanded }"
                @click.stop="sidebarExpanded = !sidebarExpanded"
              >
                <Bars3Icon class="menu-icon" v-if="!sidebarExpanded" />
                <XMarkIcon class="menu-icon" v-else />
              </BaseIconButton>
              <span class="logo">FounderFeed.co</span>
            </div>
          </header>
          <SidebarOptions
            style="padding-top: 2rem"
            :selected-option="selectedOption"
            @change="onSidebarOptionChange"
          />
          <NuxtPage />
        </aside>
      </div>
    </TransitionSlide>
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

.menu-icon-button {
  color: var(--color-text);
  transition: transform 0.3s ease;
}

.menu-icon-button.expanded {
  transform: rotate(-180deg);
}

.menu-icon {
  width: 2rem;
}

main {
  display: flex;
  position: relative;
}

.mobile-overlay {
  height: 100%;
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

@media screen and (max-width: 1023px) {
  .desktop-sidebar {
    display: none;
  }

  .mobile-sidebar {
    padding-top: 0;
  }

  .mobile-sidebar header {
    padding: 0;
  }
}

@media screen and (min-width: 1024px) {
  .menu-icon-button {
    display: none;
  }
}
</style>
