import { create } from "zustand";
import { persist } from "zustand/middleware";

//user store
export const userStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "user-storage",
    }
  )
);
