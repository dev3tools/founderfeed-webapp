import { fetchFeed, refreshAuthToken } from "../services/api.service";

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    // Client-side only
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return navigateTo("/login");
    }
    fetchFeed().catch((error) => {
      if (error.response?.status === 401) {
        const refreshToken = localStorage.getItem("refresh_token") as string;
        refreshAuthToken(refreshToken).then((res) => {
          localStorage.setItem("access_token", res.data.access);
          localStorage.setItem("refresh_token", res.data.refresh);
          return navigateTo(to.path);
        });
      }
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return navigateTo("/login");
    });
  }
});
