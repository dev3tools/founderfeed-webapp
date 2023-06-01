<script setup lang="ts">
import { onMounted, onBeforeMount, onBeforeUnmount } from "vue";
import jwt_decode from "jwt-decode";
import { useRouter } from "vue-router";
import { batchRefresh, loginWithGoogle } from "../services/api.service";
// import { startRefreshInterval } from "../utils/refreshToken";
// import { useLoaderStore } from "../store/loader.store";

// const user = useUserStore();
const router = useRouter();
// const loader = useLoaderStore();

onBeforeMount(() => {
  if (process.client) {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      router.replace("/");
    }
  }
});

onMounted(() => {
  (google as any).accounts.id.initialize({
    client_id:
      "340742341613-ep6502depv329e40u9pa1nvsb5kk2iph.apps.googleusercontent.com",
    callback: handleSignIn,
  });
  const parent = document.getElementById("google_btn");
  google.accounts.id.renderButton(parent, {
    theme: "outline",
    shape: "rectangular",
    type: "standard",
    text: "signin_with",
    size: "large",
    logo_alignment: "left",
  });
  google.accounts.id.prompt();
});

async function handleSignIn(data: any) {
  //   loader.show("Signing in with google...");
  let apiResponse;
  try {
    apiResponse = (await loginWithGoogle(data.credential)).data;
  } catch (e) {
    // loader.hide();
    return;
  }
  const userDetails: any = jwt_decode(data.credential);
  localStorage.setItem("access_token", apiResponse.tokens.access);
  localStorage.setItem("refresh_token", apiResponse.tokens.refresh);
  batchRefresh();
  const user = {
    name: userDetails.name,
    profileImage: userDetails.picture,
    email: userDetails.email,
  };
  localStorage.setItem("user_profile", JSON.stringify(user));
  //   loader.hide();
  router.replace("/");
}
</script>

<template>
  <main class="background">
    <Body class="login-body"></Body>
    <section class="container gap-8">
      <BaseLogo />
      <div class="app-details">
        <h1>Welcome to the FounderFeed.io</h1>
        <p>Description of the app</p>
      </div>
      <div class="flex flex-col gap-4 justify-between items-center">
        <p>Please sign in with your Google account to continue</p>
        <div id="google_btn" class="g_id_signin"></div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.background {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  background: var(--color-bg);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  width: calc(100% - 4rem);
  margin: 0 2rem;
  max-width: 360px;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  border-radius: 2rem;
}

.app-details {
  display: grid;
  gap: 0.25rem;
  grid-template-columns: 1fr;
  justify-items: center;
}

.app-details p {
  font-size: 1.125rem;
}

h1,
p {
  margin: 0;
}
</style>

<style>
.login-body {
  background: #f7f7f7;
}
</style>
