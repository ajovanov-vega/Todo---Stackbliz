import { defineStore } from "pinia";

export interface Todo {
  text: string;
  completed: boolean;
}

export interface TodoLists {
  id: string;
  name: string;
  private: boolean;
  todos: Todo[];
}

export const useTodoStore = defineStore("todo", {
  state: () => ({
    lists: [] as TodoLists[],
    selectedList: null as TodoLists | null,
  }),
  actions: {
    addTodoList(listName: string) {
      if (listName.trim() === "") return;
      this.lists.push({ id: self.crypto.randomUUID(), name: listName, todos: [], private: false });
    },
    removeTodoList(index: number) {
      this.lists.splice(index, 1);
      this.selectedList = null;
    },
    selectList(list: TodoLists) {
      this.selectedList = list;
    },
    addTodo(listName: string, todoText: string) {
      const list = this.lists.find((list) => list.name === listName);
      if (list) {
        if (todoText.trim() === "") return;
        list.todos.push({ text: todoText, completed: false });
      }
    },
    removeTodo(list: TodoLists, index: number) {
      if (index >= 0 && index < list.todos.length) {
        list.todos.splice(index, 1);
      }
    },
  },
  getters: {
    completedTodosCount(state) {
      if (!state.selectedList) return 0;
      return state.selectedList.todos.filter((todo) => todo.completed).length;
    },
    notCompletedTodos(state) {
      if (!state.selectedList) return 0;
      return state.selectedList.todos.filter((todo) => !todo.completed).length;
    },
  } as GetterTree<typeof useTodoStore, State>,
  // persist: {
  //   storage: persistedState.localStorage,
  // },
});
