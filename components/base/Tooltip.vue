<script setup lang="ts">
type TooltipProps = {
  message: string;
};

const props = defineProps<TooltipProps>();
</script>

<template>
  <div class="tooltip-container">
    <slot />
    <div class="tooltip">
      {{ props.message }}
    </div>
  </div>
</template>

<style scoped>
.tooltip-container {
  position: relative;
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  width: max-content;
  transform: translateX(-50%);

  display: none;
  padding: 0.5rem 1rem;
  background: var(--color-text);
  color: var(--color-bg);
  border-radius: 1rem;
  font-weight: 500;
  border: 1px solid var(--color-bg);
  box-shadow: 1px 1px 5px 2px #00000020;
}

.tooltip-container:hover .tooltip {
  display: block;
}
</style>
