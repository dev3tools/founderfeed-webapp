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
  width: 300px;
  background: var(--color-card-bg);
  border: 1px solid #cccccc20;
  border-radius: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.card:where(:hover, :focus-visible) {
  border-color: #cccccc60;
  box-shadow: -2px -2px 20px 2px #cccccc40;
}
</style>
