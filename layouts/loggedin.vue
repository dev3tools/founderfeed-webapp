<script setup lang="ts">
import { useRoute } from "vue-router";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";

const emit = defineEmits(["menu-change"]);

const pagePath = useRoute().path.replace("/", "");
const selectedOption = ref(pagePath);
const sidebarExpanded = ref(false);

if (selectedOption.value === "") {
  selectedOption.value = "top-picks";
  navigateTo("/top-picks");
}

function onSidebarOptionChange(ev: string) {
  selectedOption.value = ev;
  emit("menu-change", selectedOption.value);
  sidebarExpanded.value = false;
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
        <BaseLogo />
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
      <BaseOverlay
        v-if="sidebarExpanded"
        @overlay-click="sidebarExpanded = false"
      >
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
              <BaseLogo />
            </div>
          </header>
          <SidebarOptions
            style="padding-top: 2rem"
            :selected-option="selectedOption"
            @change="onSidebarOptionChange"
          />
          <NuxtPage />
        </aside>
      </BaseOverlay>
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
  flex: 0 0 200px;
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
