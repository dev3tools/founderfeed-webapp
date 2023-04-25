import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { useRouter } from "vue-router";

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

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response.status) {
      if (error.response.status === 401) {
        if (process.client) {
          const refreshToken = localStorage.getItem("refresh_token");
          if (refreshToken) {
            refreshAuthToken(refreshToken)
              .then((response) => {
                localStorage.setItem("refresh_token", response.data.refresh);
                localStorage.setItem("access_token", response.data.access);
                console.log(error);
              })
              .catch(() => {
                localStorage.clear();
                useRouter().push("/login");
              });
          } else {
            localStorage.clear();
            useRouter().push("/login");
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

function loginWithGoogle(auth_token: string) {
  return unauthApi.post("/social_auth/google/", { auth_token });
}

function refreshAuthToken(refresh: string) {
  return unauthApi.post("/auth/token/refresh", { refresh });
}

function fetchFeed() {
  return api.get("/feeds/");
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

export { loginWithGoogle, fetchFeed, addUserVote, fetchPostById, fetchTags };
