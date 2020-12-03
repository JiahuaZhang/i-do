import { atom, selector } from 'recoil';
import { Task, todoState } from './todo';

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