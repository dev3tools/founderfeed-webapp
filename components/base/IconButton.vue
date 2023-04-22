<template>
  <button class="icon-button">
    <slot />
  </button>
</template>

<style scoped>
.icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  background: none;
  border: none;
  box-shadow: none;

  padding: 0.5rem;

  border-radius: 50%;
  cursor: pointer;
}
</style>
