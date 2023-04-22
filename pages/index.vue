<template>
  <div class="main-page-layout">
    <header>
      <div class="flex">
        <span style="font-weight: 600; font-size: 2rem">FounderFeed.co</span>
      </div>
    </header>
    <main>
      <aside>
        <SidebarOptions />
      </aside>
      <div class="content">
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
  flex: 0 0 300px;
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
</style>
