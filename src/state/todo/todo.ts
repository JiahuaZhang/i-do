import { atom } from 'recoil';

export interface Todo {
  id: number;
  description: string;
  isCompleted: boolean;
}

export interface Task {
  todos: Todo[];
  name: string;
  id: number;
}

const mockTasks: Task[] = [];

export const todoState = atom({
  key: 'todoState',
  default: mockTasks,
});
