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

// export const usePersonStore = defineStore("person", () => {
//   const firstName = ref<string>("John");
//   const lastName = ref<string>("Doe");
//   const email = ref<string>("john.doe@vegait.rs");

//   const addPerson = (firstNameValue: string, lastNameValue: string, emailValue: string) => {
//     if (firstNameValue !== "") {
//       firstName.value = firstNameValue;
//     }
//     if (lastNameValue !== "") {
//       lastName.value = lastNameValue;
//     }
//     if (emailValue !== "") {
//       email.value = emailValue;
//     }
//   };

//   const fullName = (): string => {
//     return `${firstName.value} ${lastName.value}`;
//   };

//   return {
//     firstName,
//     lastName,
//     email,
//     addPerson,
//     fullName,
//   };
// });
