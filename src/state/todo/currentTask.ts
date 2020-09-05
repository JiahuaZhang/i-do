import { atom, selector } from 'recoil';

import { todoState } from './todo';

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
