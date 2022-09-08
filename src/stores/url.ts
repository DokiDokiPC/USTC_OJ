import { defineStore } from "pinia";

export const useUrlStore = defineStore("url", () => {
  const base_url = new URL("http://127.0.0.1:5000/");
  const contests_url = new URL("contests/", base_url);
  const problems_url = new URL("problems/", base_url);
  const status_url = new URL("status/", base_url);
  const users_url = new URL("users/", base_url);
  const tokens_url = new URL("tokens/", base_url);
  return {
    base_url,
    contests_url,
    problems_url,
    status_url,
    users_url,
    tokens_url,
  };
});
