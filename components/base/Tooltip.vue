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
  padding: 0.5rem;
  background: var(--color-text);
  color: var(--color-bg);
  border-radius: 1rem;
}

.tooltip-container:hover .tooltip {
  display: block;
}
</style>
