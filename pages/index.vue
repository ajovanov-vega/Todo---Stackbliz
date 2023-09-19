<template>
  <section class="welcome">
    <div class="welcome__container">
      <div class="welcome__logo-container">
        <img src="~/assets/svg/logo-white.svg" alt="VegaIT logo" width="142" height="35" class="welcome__logo" />
      </div>
      <h1 class="welcome__title">
        <span class="welcome__title-emphasize">TODO</span>
        App | Login
      </h1>
      <form class="welcome__form" action="POST" @submit.prevent="submitForm">
        <div class="welcome__form-item" :class="{ 'welcome__form-item--invalid': !firstNameValidity }">
          <label class="welcome__form-label" for="firstName">First name</label>
          <input
            class="input welcome__form-input"
            type="text"
            id="firstName"
            v-model.trim="firstName"
            @input="validateInput(firstName, firstNameValidity)"
            autocomplete="given-name"
          />
          <p v-if="!firstNameValidity">Please enter a valid name!</p>
        </div>
        <div class="welcome__form-item" :class="{ 'welcome__form-item--invalid': !lastNameValidity }">
          <label class="welcome__form-label" for="lastName">Last name</label>
          <input
            class="input welcome__form-input"
            type="text"
            id="lastName"
            v-model.trim="lastName"
            @input="validateInput(lastName, lastNameValidity)"
            autocomplete="family-name"
          />
          <p v-if="!lastNameValidity">Please enter a valid last name!</p>
        </div>
        <div class="welcome__form-item" :class="{ 'welcome__form-item--invalid': !emailValidity }">
          <label class="welcome__form-label" for="email">Email</label>
          <input
            class="input welcome__form-input"
            type="email"
            id="email"
            v-model.trim="email"
            @input="validateInput(email, emailValidity, true)"
            autocomplete="email"
          />
          <p v-if="!emailValidity">Please enter a valid email!</p>
        </div>
        <button type="submit" class="btn btn--white welcome__link" :class="{ 'btn--loading': isLoading }">
          <span v-if="!isLoading">Continue</span>
        </button>
      </form>
      <div class="welcome__illustration-container">
        <img class="welcome__illustration" src="~/assets/svg/illustration.svg" alt="Illustration" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { usePersonStore } from "~/stores/profile";
import { useRouter } from "vue-router";

// Page title and meta tags
useHead({
  title: "TODO - App | Login",
  meta: [{ name: "description", content: "Welcome to TODO application." }],
});

// Person store
const personStore = usePersonStore();

// Input fields and validity flags
const firstName: Ref<string> = ref("");
const lastName: Ref<string> = ref("");
const email: Ref<string> = ref("");
const firstNameValidity: Ref<boolean> = ref(true);
const lastNameValidity: Ref<boolean> = ref(true);
const emailValidity: Ref<boolean> = ref(true);

// Loading indicator
const isLoading: Ref<boolean> = ref(false);

// Vue Router
const router = useRouter();

// Input validation functions
const validateInput = (value: string, validityRef: boolean, isEmail?: boolean) => {
  const inputValue = value; // Access value property
  const isValid = inputValue.trim() !== "";
  validityRef = isValid;

  if (isEmail) {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!inputValue.match(validRegex)) {
      emailValidity.value = false;
      return false;
    }
  }

  return isValid;
};

// Form submission
const submitForm = async () => {
  isLoading.value = true;
  firstNameValidity.value = true;
  lastNameValidity.value = true;
  emailValidity.value = true;

  const firstNameValidation = validateInput(firstName.value, firstNameValidity.value);
  const lastNameValidation = validateInput(lastName.value, lastNameValidity.value);
  const emailValidation = validateInput(email.value, emailValidity.value);

  const isFormValid = firstNameValidation && lastNameValidation && emailValidation;

  if (isFormValid) {
    try {
      await personStore.addPerson(firstName.value, lastName.value, email.value);
      setTimeout(() => {
        isLoading.value = false;
        router.push("/dashboard");
      }, 3000);
    } catch (error) {
      console.error("Error adding person:", error);
      isLoading.value = false;
    }
  } else {
    if (!firstNameValidation) {
      firstNameValidity.value = firstNameValidation;
    }
    if (!lastNameValidation) {
      lastNameValidity.value = lastNameValidation;
    }
    if (!emailValidation) {
      emailValidity.value = emailValidation;
    }
    isLoading.value = false;
  }
};
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.welcome {
  display: flex;
  height: 100%;
  min-height: 100vh;
  min-width: 100vw;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: $tetsu-green;
}

.welcome__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.welcome__logo-container {
  border-bottom: 1px solid $white;
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  margin-bottom: 44px;
  max-width: 440px;
  padding: 0 34px 35px;
  text-align: center;
  width: 100%;
}

.welcome__logo {
  display: inline-block;
}

.welcome__title {
  color: $white;
  display: block;
  font-size: 24px;
  font-weight: normal;
  line-height: 1;
  margin: 0 0 24px;

  @media screen and (min-width: $size-tablet) {
    font-size: 36px;
  }
}

.welcome__title-emphasize {
  color: $dry-seedlings;
}

.welcome__form {
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
}

.welcome__form-item {
  color: $white;
  display: block;
  flex: 1 1 auto;
  margin-bottom: 16px;
}

.welcome__form-label {
  display: block;
  margin-bottom: 5px;
}

.welcome__form-input {
  border-color: $white;
  color: $white;
  display: block;
  width: 100%;
}

.welcome__form-item--invalid {
  color: $oil-on-fire;

  .welcome__form-input {
    border-color: $oil-on-fire;
  }
}

.welcome__link {
  min-width: 180px;
}

.welcome__illustration-container {
  display: flex;
  justify-content: center;
  padding-top: 60px;

  @media screen and (min-width: $size-tablet) {
    padding-top: 78px;
  }
}

.welcome__illustration {
  display: inline-block;
  width: 100%;
  max-width: 155px;
  object-fit: contain;
  flex: none;

  @media screen and (min-width: $size-tablet) {
    max-width: 238px;
  }
}
</style>
