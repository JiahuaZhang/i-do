import { atom } from 'recoil';

export interface Todo {
  description: string;
  isCompleted: boolean;
}

export interface Task {
  todos: Todo[];
  name: string;
  id: number;
}

const mockTasks: Task[] = [
  { name: '', todos: [], id: 0 },
  { name: '9', todos: [], id: 1 },
  { name: 'nine simple', todos: [], id: 2 },
  { name: 'nine small', todos: [], id: 3 },
  { name: 'nine nice', todos: [], id: 4 },
  { name: '9 simple', todos: [], id: 5 },
  { name: '9 small', todos: [], id: 6 },
  { name: '9 nice', todos: [], id: 7 },
  { name: 'nine simple things', todos: [], id: 8 },
  { name: 'nine small todos', todos: [], id: 9 },
  { name: 'nine nice stuff', todos: [], id: 10 },
];

export const todoState = atom({
  key: 'todoState',
  default: mockTasks,
});
