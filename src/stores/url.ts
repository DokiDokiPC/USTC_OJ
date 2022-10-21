import { defineStore } from "pinia";

export const useUrlStore = defineStore("url", () => {
  const backend_url = new URL("http://127.0.0.1:5000/");
  const contests_url = new URL("contests/", backend_url);
  const problems_url = new URL("problems/", backend_url);
  const submissions_url = new URL("submissions/", backend_url);
  const users_url = new URL("users/", backend_url);
  const tokens_url = new URL("tokens/", backend_url);
  return {
    base_url: backend_url,
    contests_url,
    problems_url,
    submissions_url,
    users_url,
    tokens_url,
  };
});
