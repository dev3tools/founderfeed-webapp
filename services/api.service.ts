import axios from "axios";

const api = axios.create({ baseURL: "https://api.founderfeed.io/" });

function loginWithGoogle(auth_token: string) {
  return api.post("/social_auth/google/", { auth_token });
}

export { loginWithGoogle };
