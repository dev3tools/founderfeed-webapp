import axios from "axios";

const api = axios.create({ baseURL: "http://35.244.17.160/" });

function loginWithGoogle(auth_token: string) {
  return api.post("/social_auth/google/", { auth_token });
}

export { loginWithGoogle };
