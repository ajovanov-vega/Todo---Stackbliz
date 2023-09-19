import { defineStore } from "pinia";

export const usePersonStore = defineStore("person", {
  state: () => ({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@vegait.rs",
  }),
  actions: {
    addPerson(firstName: string, lastName: string, email: string) {
      if (firstName !== "") {
        this.firstName = firstName;
      }
      if (lastName !== "") {
        this.lastName = lastName;
      }
      if (email !== "") {
        this.email = email;
      }
    },
  },
  getters: {
    fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
