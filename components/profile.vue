<template>
  <div class="dashboard__profile">
    <div class="dashboard__profile-image-wrapper">
      <img class="dashboard__profile-image" src="https://placehold.co/80x80" :alt="fullName" />
    </div>
    <div class="dashboard__profile-info">
      <h2 class="dashboard__profile-name">{{ fullName }}</h2>
      <a class="dashboard__profile-email" target="_blank" :href="emailHref">{{ email }}</a>
    </div>
    <div class="dashboard__profile-ctas">
      <NuxtLink class="dashboard__sidebar-logo-link" to="/"
        ><Icon class="dashboard__sidebar-logo-link-icon" name="line-md:arrow-open-right" /> Logout
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  fullName: string;
  email: string;
  emailHref: string;
}>();
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.dashboard__profile {
  border-bottom: 1px solid $gainsboro;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 15px;
  text-align: center;

  @media screen and (min-width: $size-tablet) {
    padding-bottom: 32px;
    padding-top: 40px;
  }
}

.dashboard__profile-image-wrapper {
  display: flex;
  justify-content: center;
}

.dashboard__profile-image {
  border-radius: 50%;
  display: inline-flex;
  flex: none;
  height: 48px;
  object-fit: cover;
  object-position: center;
  width: 48px;

  @media screen and (min-width: $size-tablet) {
    height: 80px;
    width: 80px;
  }
}

.dashboard__profile-info {
  display: block;
  padding: 16px;
  text-align: center;
}

.dashboard__profile-name {
  margin: 0 0 4px;
  font-size: 28px;
  line-height: 1;

  @media screen and (min-width: $size-tablet) {
    font-size: 30px;
  }
}

.dashboard__profile-email {
  font-size: 14px;
  font-weight: bold;
  line-height: 1;
  color: $black;
}

.dashboard__sidebar-logo-link-icon {
  color: $oil-on-fire;
}

.dashboard__sidebar-logo-link {
  display: inline-grid;
  align-items: center;
  grid-template-columns: 20px 1fr;
  gap: 0 5px;

  &:hover {
    color: $oil-on-fire;
  }
}
</style>
