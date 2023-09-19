<template>
  <aside v-if="selectedList" class="dashboard__details">
    <div class="dashboard__details-wrapper">
      <h2 class="dashboard__details-title">Details</h2>
      <h3 class="dashboard__details-name">{{ selectedList.name }}</h3>
      <div class="dashboard__details-info">
        <h4 class="dashboard__details-info-title">Statistics</h4>
        <ul class="dashboard__details-info-list">
          <li class="dashboard__details-info-list-item">
            <span class="dashboard__details-info-list-item-emphasize">{{ selectedList.todos.length }}</span>
            {{ taskPlural(selectedList.todos.length) }}
          </li>
          <li class="dashboard__details-info-list-item">
            <span class="dashboard__details-info-list-item-emphasize">{{ completedTodosCount }}</span>
            completed
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { TodoLists } from "~/stores/todos";

const props = defineProps<{
  selectedList?: TodoLists;
  completedTodosCount: number;
}>();

function taskPlural(a: number) {
  if (a > 1) {
    return "tasks";
  }

  return "task";
}
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.dashboard__details {
  background-color: $bleached-silk;
  border-left: 1px solid $gainsboro;
  display: flex;
  flex-direction: column;
  grid-area: details;
  width: 100%;
}

.dashboard__details-wrapper {
  display: block;
  overflow: auto;
  padding: 32px 20px;

  @media screen and (min-width: $size-desktop) {
    padding: 62px 20px;
  }
}

.dashboard__details-title {
  border-bottom: 1px solid $gainsboro;
  font-size: 28px;
  font-weight: normal;
  line-height: 1;
  margin: 0 0 32px;
  padding-bottom: 8px;

  @media screen and (min-width: $size-tablet) {
    font-size: 30px;
  }
}

.dashboard__details-name {
  display: block;
  font-size: 24px;
  font-weight: normal;
  line-height: 1;
  margin: 0 0 32px;
}

.dashboard__details-info-title {
  border-bottom: 1px solid $gainsboro;
  display: block;
  font-size: 20px;
  font-weight: normal;
  line-height: 1;
  margin: 0 0 16px;
  padding-bottom: 8px;
}

.dashboard__details-info-list {
  font-size: 14px;
  line-height: 1;
  list-style: none;
  margin: 0;
  padding: 0;
}

.dashboard__details-info-list-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.dashboard__details-info-list-item-emphasize {
  color: $tetsu-green;
  display: inline-block;
  font-size: 30px;
  margin-right: 8px;
}
</style>
