import { defineStore } from "pinia";

export const useUrlStore = defineStore("url", () => {
  const base_url = new URL("http://localhost:5000/");
  const contests_url = new URL("contests/", base_url);
  const problems_url = new URL("problems/", base_url);
  const status_url = new URL("status/", base_url);
  const users_url = new URL("users/", base_url);
  return { base_url, contests_url, problems_url, status_url, users_url };
});
