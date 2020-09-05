import { atom } from 'recoil';

export interface Todo {
  description: string;
  isCompleted: boolean;
}

export interface Task {
  todos: Todo[];
  name: string;
}

const mockTasks: Task[] = [
  { name: '', todos: [] },
  { name: '9', todos: [] },
  { name: 'nine simple', todos: [] },
  { name: 'nine small', todos: [] },
  { name: 'nine nice', todos: [] },
  { name: '9 simple', todos: [] },
  { name: '9 small', todos: [] },
  { name: '9 nice', todos: [] },
  { name: 'nine simple things', todos: [] },
  { name: 'nine small todos', todos: [] },
  { name: 'nine nice stuff', todos: [] },
];

export const todoState = atom({
  key: 'todoState',
  default: mockTasks,
});
