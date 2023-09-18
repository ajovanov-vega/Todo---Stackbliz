<template>
  <section class="dashboard">
    <aside class="dashboard__sidebar">
      <div class="dashboard__sidebar-top">
        <NuxtLink class="dashboard__sidebar-logo-link" to="/dashboard">
          <img class="dashboard__sidebar-logo" src="~/assets/svg/logo.svg" width="100" height="30" alt="VegaIT logo" />
        </NuxtLink>
        <h1 class="dashboard__sidebar-title"><span class="dashboard__sidebar-title-emphasize">TODO</span>App</h1>
      </div>
      <Profile :full-name="fullName" :email="email" :email-href="emailHref" />
      <div class="dashboard__lists">
        <div class="dashboard__lists-wrapper">
          <div class="dashboard__lists-pill" v-if="todoLists.length">
            <Icon name="line-md:check-list-3-filled" class="dashboard__lists-pill-icon" /> Lists
          </div>
          <ul class="dashboard__lists-todo" v-if="todoLists.length">
            <li
              class="dashboard__lists-todo-item"
              v-for="(list, index) in todoLists"
              :key="index"
              @click="showTodoList(list)"
              :class="{ 'dashboard__lists-todo-item--active': selectedList === list }"
            >
              <span class="dashboard__lists-todo-item-name">{{ list.name }}</span>
              <button class="dashboard__lists-todo-item-remove" @click="removeList(index)">
                <Icon name="line-md:remove" class="dashboard__lists-todo-item-remove-icon" />
              </button>
            </li>
          </ul>
          <div class="dashboard__lists-ctas">
            <button type="button" class="dashboard__lists-btn" @click="showAddListInput()">
              <Icon name="line-md:plus" class="dashboard__lists-btn-icon" /> Create new list
            </button>
            <input
              class="input dashboard__lists-add-list-input"
              type="text"
              v-model="newList"
              @keydown.enter="addList"
              placeholder="Add a new list"
              v-if="newListToggle"
            />
          </div>
        </div>
      </div>
    </aside>
    <main class="dashboard__main">
      <div class="dashboard__main-wrapper">
        <div class="dashboard__main-top">
          <h2 class="dashboard__main-greeting">
            Hi <span class="dashboard__main-greeting-emphasize">{{ firstName }}</span>
          </h2>
          <p v-if="!todoStore.notCompletedTodos" class="dashboard__main-top-info">
            Well done! You don’t have any uncompleted task!
          </p>
          <p v-else class="dashboard__main-top-info">
            You have <strong>{{ todoStore.notCompletedTodos }}</strong> uncompleted
            {{ taskPlural(todoStore.notCompletedTodos) }}
          </p>
        </div>
        <div class="dashboard__main-todo">
          <div class="dashboard__main-todo-top">
            <div class="dashboard__main-todo-top-day">
              <div class="dashboard__main-todo-day">{{ day }}</div>
              <time class="dashboard__main-todo-date" :datetime="dayjs().utc().toString()"> {{ date }} </time>
              <NuxtLink v-if="isToday" class="dashboard__main-todo-today" to="/dashboard">Today</NuxtLink>
            </div>
          </div>
          <div class="dashboard__main-todo-wrapper">
            <label class="dashboard__main-todo-add" for="add-todo">
              <Icon name="line-md:check-list-3-filled" class="dashboard__main-todo-add-icon"></Icon>
              <input
                id="add-todo"
                class="dashboard__main-todo-add-input"
                v-model="newTodo"
                @keyup.enter="addTodo"
                placeholder="Add a task..."
              />
            </label>
            <div class="dashboard__main-todos-wrapper">
              <div class="dashboard__main-todo-empty" v-if="!selectedList">
                <p class="dashboard__main-todo-empty-paragraph">
                  You have no tasks to do!<br />Enjoy your day or add a task.
                </p>
                <img
                  src="~/assets/svg/sunrays.svg"
                  width="120"
                  height="120"
                  class="dashboard__main-todo-empty-image"
                  alt="Empty tasks list image"
                />
              </div>
              <div class="dashboard__main-todos" v-else>
                <div class="dashboard__main-todos-item">
                  <h3 class="dashboard__main-todo-name">Today's tasks</h3>
                  <ul class="dashboard__main-todo-list">
                    <li class="dashboard__main-todo-list-item" v-for="(todo, index) in selectedList.todos" :key="index">
                      <label class="checkbox__label">
                        <input class="checkbox__input" type="checkbox" v-model="todo.completed" />
                        <span class="checkbox__label-text">{{ todo.text }}</span>
                      </label>
                      <button class="dashboard__main-todo-list-item-remove" type="button" @click="removeTodo(index)">
                        <Icon name="line-md:remove" class="dashboard__main-todo-list-item-remove-icon" />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Details v-if="selectedList" :selected-list="selectedList" :completed-todos-count="todoStore.completedTodosCount" />
  </section>
</template>
<script setup lang="ts">
import { computed, ref, Ref } from "vue";
import { storeToRefs } from "pinia";
import { usePersonStore } from "~/stores/profile";
import { TodoLists, useTodoStore } from "~/stores/todos";
import dayjs from "dayjs";

// Page title and meta tags
useHead({
  title: "TODO - Dashboard",
  meta: [{ name: "description", content: "Welcome to TODO application dashboard." }],
});

// Person store
const personStore = usePersonStore();
const { firstName, email } = storeToRefs(personStore);
const emailHref = `mailto:${email.value}`;
const fullName = personStore.fullName;

// Current date and day
const date = dayjs().format("MMM DD, YYYY");
const day = dayjs().format("dddd");
const isToday = dayjs().isToday();

// Todo store
const todoStore = useTodoStore();
const selectedList = computed(() => todoStore.selectedList);

// Todo input fields
const newTodo: Ref<string> = ref("");
const newList: Ref<string> = ref("");
const newListToggle: Ref<boolean> = ref(false);

// Add a new todo
const addTodo = () => {
  if (!selectedList.value || newTodo.value.trim() === "") return;
  todoStore.addTodo(selectedList.value.name, newTodo.value);
  newTodo.value = "";
};

// Remove a todo
const removeTodo = (index: number) => {
  if (selectedList.value) {
    todoStore.removeTodo(selectedList.value, index);
  }
};

// Pluralize 'task'
const taskPlural = (a: number) => (a > 1 ? "tasks" : "task");

// Add a new todo list
const addList = () => {
  if (newList.value.trim() === "") return;
  todoStore.addTodoList(newList.value);
  newList.value = "";
  newListToggle.value = false;
};

// Remove a todo list
const removeList = (index: number) => {
  todoStore.removeTodoList(index);
  newListToggle.value = false;
};

// Todo lists
const todoLists = todoStore.lists;

// Select a todo list
const showTodoList = (list: TodoLists) => {
  todoStore.selectList(list);
};

// Toggle new list input
const showAddListInput = () => {
  newListToggle.value = !newListToggle.value;
};
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";
.dashboard {
  display: block;
  height: 100%;
  width: 100%;

  @media screen and (min-width: $size-tablet) {
    display: grid;
    gap: 0;
    grid-template-areas: "sidebar main" "details details";
    grid-template-columns: 299px 1fr;
    grid-template-rows: 3fr 1fr;
  }

  @media screen and (min-width: $size-desktop) {
    grid-template-areas: "sidebar main details";
    grid-template-columns: 299px 1fr 299px;
    grid-template-rows: 1fr;
  }
}

.dashboard__sidebar {
  background-color: $white;
  border-right: 1px solid $gainsboro;
  display: flex;
  flex-direction: column;
  grid-area: sidebar;

  @media screen and (min-width: $size-desktop) {
    height: 100%;
  }
}

.dashboard__sidebar-top {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 18px 15px;

  @media screen and (min-width: $size-tablet) {
    border-bottom: 1px solid $gainsboro;
  }
}

.dashboard__sidebar-logo-link {
  display: inline-flex;
  text-decoration: none;
}

.dashboard__sidebar-logo {
  flex: none;
  height: 17px;
  object-fit: contain;

  @media screen and (min-width: $size-desktop) {
    height: 30px;
  }
}

.dashboard__sidebar-title {
  font-size: 24px;
  font-weight: normal;
  letter-spacing: -2px;
  line-height: 1;
  margin: 0;
  position: relative;
  top: -5px;

  @media screen and (min-width: $size-desktop) {
    font-size: 30px;
  }
}

.dashboard__sidebar-title-emphasize {
  color: $oil-on-fire;
  margin-right: 8px;
}

.dashboard__sidebar-logo-link {
  font-size: 14px;

  &::before {
    content: var(--icon-arrow-right-from-bracket);
    font-family: $font-icon;
  }
}

.dashboard__lists {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}

.dashboard__lists-ctas {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
}

.dashboard__lists-btn {
  display: grid;
  grid-template-columns: 14px 1fr;
  gap: 0 5px;
  background: none;
  border: none;
  color: $black;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  line-height: 1;
  margin: 0;
  outline: none;
  text-decoration: underline;
}

.dashboard__lists-btn-icon {
  color: $oil-on-fire;
}

.dashboard__lists-add-list-input {
  flex: 1 1 auto;
  margin-top: 15px;
  width: 100%;
}

.dashboard__lists-wrapper {
  display: flex;
  flex-direction: column;
  padding: 32px 16px;
}

.dashboard__lists-pill {
  align-items: center;
  background-color: $bright-lavender;
  border-radius: 10px;
  color: $white;
  display: grid;
  gap: 0 10px;
  grid-template-columns: 20px 1fr;
  padding: 10px 16px;
}

.dashboard__lists-pill-icon {
  font-size: 22px;
}

.dashboard__lists-todo {
  display: block;
  list-style: none;
  margin: 0;
  padding: 24px 0 10px;
  border-bottom: 1px dashed $gainsboro;
}

.dashboard__lists-todo-item {
  align-items: center;
  background-color: transparent;
  border-radius: 8px;
  color: $black;
  display: flex;
  padding: 10px 8px;
  transition: background-color $transition;
  cursor: pointer;

  &::before {
    display: inline-flex;
    background-color: $tetsu-green;
    border-radius: 50%;
    content: "";
    height: 10px;
    margin-right: 10px;
    width: 10px;
    position: relative;
    top: 1px;
  }

  &:hover {
    background-color: $bright-lavender;
  }
}

.dashboard__lists-todo-item--private,
.dashboard__lists-todo-item--active {
  background-color: $bleached-silk;

  &::before {
    background-color: $oil-on-fire;
  }
}

.dashboard__lists-todo-item-name {
  flex: 1 1 auto;
  text-align: left;
}

.dashboard__lists-todo-item-remove {
  cursor: pointer;
  text-align: right;
  transition: color $transition;
  width: 30px;
  display: inline-flex;
  justify-content: flex-end;

  &:hover {
    color: $white;
  }
}

.dashboard__lists-todo-item-link {
  color: $black;
  text-decoration: underline;
}

.dashboard__main {
  display: flex;
  flex: 1 1 auto;
  grid-area: main;
  width: 100%;
}

.dashboard__main-wrapper {
  display: block;
  padding: 40px 20px;
  position: relative;
  width: 100%;

  @media screen and (min-width: $size-tablet) {
    padding: 65px 30px;
  }
}

.dashboard__main-top {
  display: block;
  margin-bottom: 30px;
}

.dashboard__main-greeting {
  color: $black;
  font-size: 24px;
  font-weight: normal;
  line-height: 1;
  margin: 0 0 16px;

  @media screen and (min-width: $size-tablet) {
    font-size: 32px;
  }
}

.dashboard__main-greeting-emphasize {
  color: $tetsu-green;
}

.dashboard__main-top-info {
  font-size: 14px;
  line-height: 1.2;
  margin: 0;

  @media screen and (min-width: $size-tablet) {
    font-size: 16px;
  }
}

.dashboard__main-todo {
  background-color: $tetsu-green;
  border-radius: 16px;
  color: $white;
  display: flex;
  flex-direction: column;
  padding: 32px 20px;
  align-items: center;

  @media screen and (min-width: $size-tablet) {
    padding: 32px 24px;
  }

  @media screen and (min-width: $size-desktop) {
    padding: 56px 32px;
  }
}

.dashboard__main-todo-top {
  border-bottom: 1px solid $white;
  display: flex;
  flex: 1 1 auto;
  justify-content: space-around;
  padding-bottom: 24px;
  text-align: center;
  width: 100%;
}

.dashboard__main-todo-day {
  font-size: 30px;
  font-weight: normal;
  line-height: 1;
  margin-bottom: 4px;
}

.dashboard__main-todo-date {
  font-weight: bold;
  display: block;
}

.dashboard__main-todo-today {
  display: inline-block;
  color: rgba($white, 0.4);
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.05em;
  line-height: 1;
  margin-top: 16px;
}

.dashboard__main-todo-wrapper {
  display: block;
  max-width: 500px;
  padding-top: 40px;
  text-align: center;
  width: 100%;
}

.dashboard__main-todo-add {
  border-radius: 24px;
  border: 1px solid $white;
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: 0 5px;
  align-items: center;
  padding: 0 24px;
}

.dashboard__main-todo-add-icon {
  display: inline-flex;
  font-size: 22px;
  width: 22px;
}

.dashboard__main-todo-add-input {
  background: transparent;
  border: none;
  color: $white;
  flex: 1 1 auto;
  font-size: 14px;
  height: 48px;
  line-height: 1;
  outline: none;
  padding: 0 12px;
  text-align: left;

  &::placeholder {
    color: $white;
  }

  &:focus {
    border: none;
    outline: none;
  }

  @media screen and (min-width: $size-tablet) {
    font-size: 16px;
  }
}

.dashboard__main-todos-wrapper {
  padding-top: 32px;
}

.dashboard__main-todo-name {
  font-size: 20px;
  font-weight: normal;
  margin: 0 0 16px;
  text-align: left;

  @media screen and (min-width: $size-tablet) {
    font-size: 24px;
  }
}

.dashboard__main-todo-empty-paragraph {
  margin: 0 0 16px;
  line-height: 1.2;
}

.dashboard__main-todos-item + .dashboard__main-todos-item {
  margin-top: 32px;
}

.dashboard__main-todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

.dashboard__main-todo-list-item {
  display: flex;
  margin-bottom: 16px;

  .checkbox__label {
    flex: 1 1 auto;
  }
}

button[type="button"].dashboard__main-todo-list-item-remove {
  background: none;
  border: none;
  color: $white;
  cursor: pointer;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: $bright-lavender;
  }
}

.dashboard__main-todo-list-item-remove-icon {
  color: $white;
}
</style>
