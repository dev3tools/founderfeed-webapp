import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosResponse } from "axios";

const unauthApi = axios.create({ baseURL: "https://api.founderfeed.io" });

const api = axios.create({ baseURL: "https://api.founderfeed.io/api" });
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (process.client) {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});

function loginWithGoogle(auth_token: string) {
  return unauthApi.post("/social_auth/google/", { auth_token });
}

function refreshAuthToken(refresh: string) {
  return unauthApi.post("/auth/token/refresh", { refresh });
}

function fetchFeed(options?: any) {
  return api.get("/feeds/", { params: options });
}

function fetchPostById(id: string) {
  return api.get(`/feeds/${id}`);
}

function fetchTags() {
  return api.get("/tags/");
}

function addUserVote(feed: number, vote: -1 | 0 | 1) {
  return api.post(`/vote/`, { feed, vote });
}

function addBookmark(feed: number) {
  return api.post(`/bookmarks/`, { feed });
}

function removeBookmark(feed: number) {
  return api.delete(`/bookmarks/${feed}/`);
}

function getTags(search: string) {
  return api.get("/tags/", { params: { name__icontains: search } });
}

export {
  loginWithGoogle,
  fetchFeed,
  addUserVote,
  fetchPostById,
  fetchTags,
  addBookmark,
  removeBookmark,
  refreshAuthToken,
  getTags,
};
