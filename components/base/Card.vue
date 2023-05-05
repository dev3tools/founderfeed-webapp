<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;

  padding: 1rem;
  width: 280px;
  background: var(--color-card-bg);
  border: 1px solid #cccccc20;
  border-color: var(--color-card-border);
  box-shadow: 0px 0px 2px 0px var(--color-slate-gray-opacity);
  border-radius: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
</style>
