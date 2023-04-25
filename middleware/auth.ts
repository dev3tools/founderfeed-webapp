export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    // Client-side only
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      return navigateTo("/login");
    }
  }
});
