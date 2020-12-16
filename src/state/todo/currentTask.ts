import { atom, selector, selectorFamily } from 'recoil';
import { Task, Todo, todoState } from './todo';

export const currentTaskIndex = atom({
  key: 'currentTaskIndex',
  default: 0,
});

export const currentTaskName = selector<string>({
  key: 'currentTaskName',
  get: ({ get }) => {
    const tasks = get(todoState);
    const index = get(currentTaskIndex);

    return tasks[index]?.name;
  },
  set: ({ get, set }, value) => {
    const tasks = get(todoState);
    const index = get(currentTaskIndex);

    const newTasks = tasks.map((val, i) => (index === i ? { ...val, name: value as string } : val));
    set(todoState, newTasks);
  },
});

export const currentTask = selector<Task | null>({
  key: 'currentTask',
  get: ({ get }) => {
    const tasks = get(todoState);
    const index = get(currentTaskIndex);

    return tasks[index];
  },
  set: ({ get, set }, value) => {
    const tasks = get(todoState);
    const index = get(currentTaskIndex);

    if (!value) {
      const newTasks = tasks.filter((_, i) => i !== index);
      set(todoState, newTasks);
      set(currentTaskIndex, 0)
      return;
    }

    const newTasks = tasks.map((val, i) => index === i ? (value as Task) : val);
    set(todoState, newTasks);
  }
})

export const currentTaskTodo = selectorFamily<Todo | null, number>({
  key: 'currentTaskTodo',
  get: id => ({ get }) => {
    const tasks = get(todoState);
    const index = get(currentTaskIndex);

    return (tasks[index].todos.find(todo => todo.id === id)) as Todo
  },
  set: id => ({ get, set }, value) => {
    const tasks = get(todoState);
    const index = get(currentTaskIndex);

    let newTodos: Todo[];
    if (!value) {
      newTodos = tasks[index].todos.filter(todo => todo.id !== id);
    } else {
      newTodos = tasks[index].todos.map(todo => todo.id === id ? (value as Todo) : todo);
    }

    const newTasks = tasks.map((task, i) => i === index ? ({ ...task, todos: newTodos }) : task);
    set(todoState, newTasks);
  }
})