import { create } from "zustand";

export const useGithubStore = create((set) => ({
  username: "",
  setUsername: (username) => set({ username }),

  profile: null,
  repos: [],
  followers: [],
  error: null,
  searchError: null,

  setProfile: (profile) => set({ profile }),
  setRepos: (repos) => set({ repos }),
  setFollowers: (followers) => set({ followers }),
  setError: (err) => set({ error: err }),
  setSearchError: (err) => set({ searchError: err }),

  reset: () =>
    set({
      username: "",
      profile: null,
      repos: [],
      followers: [],
      error: null,
      searchError: null,
    }),
}));
