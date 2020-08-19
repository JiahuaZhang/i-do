import { useState } from 'react';

import { createGenericContext } from '../util/createGenericContext';

export interface Todo {
  todoId: number;
  isCompleted: boolean;
  description: string;
}

export interface Set {
  setId: number;
  name: string;
  todos: Todo[];
  nextTodoId: number;
}

interface State {
  sets: Set[];
  nextSetId: number;
}

export const useSets = () => {
  const [state, setState] = useState<State>({
    sets: [],
    nextSetId: 0,
  });

  const addNewSet = (name: string) =>
    setState((value) => {
      value.sets.push({ name, setId: value.nextSetId, todos: [], nextTodoId: 0 });
      value.nextSetId++;
      return value;
    });

  const deleteSet = (setId: number) =>
    setState((value) => {
      value.sets = value.sets.filter((val) => val.setId !== setId);
      return { ...value };
    });

  const updateSet = (set: Set) =>
    setState((value) => {
      value.sets = value.sets.map((val) => (val.setId === set.setId ? set : val));
      return value;
    });

  const addNewTodo = (setId: number, todo: Todo) =>
    setState((value) => {
      value.sets.map((val) => {
        if (val.setId === setId) {
          todo.todoId = val.nextTodoId;
          ++val.nextTodoId;
          val.todos.push(todo);
        }
        return val;
      });
      return { ...value };
    });

  const updateTodo = (setId: number, todo: Todo) =>
    setState((value) => {
      value.sets.map((val) => {
        if (val.setId === setId) {
          val.todos = val.todos.map((v) => {
            if (v.todoId === todo.todoId) {
              return todo;
            }
            return v;
          });
        }
        return val;
      });
      return value;
    });

  const deleteTodo = (setId: number, todoId: number) =>
    setState((value) => {
      value.sets = value.sets.map((val) => {
        if (val.setId === setId) {
          val.todos = val.todos.filter((v) => v.todoId !== todoId);
        }
        return val;
      });
      return { ...value };
    });

  return { state, addNewSet, updateSet, deleteSet, addNewTodo, updateTodo, deleteTodo };
};

export const {
  GenericContext: SetContext,
  GenericContextProvider: GlobalSetProvider,
} = createGenericContext(useSets);
