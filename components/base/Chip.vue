<template>
  <div class="chip">
    <slot />
  </div>
</template>

<style scoped>
.chip {
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--color-card-border);
  color: var(--color-text);
  font-size: 0.75rem;
}
</style>
