<template>
  <span class="logo">FounderFeed.io</span>
</template>

<style scoped>
.logo {
  background: linear-gradient(
    to bottom right,
    var(--color-green),
    var(--color-green),
    var(--color-blue),
    var(--color-blue),
    var(--color-red)
  );
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: var(--font-secondary);
  font-size: 2.5rem;
}

@media screen and (max-width: 768px) {
  .logo {
    font-size: 1.875rem;
  }
}
</style>
