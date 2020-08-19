import { useState } from 'react';

import { createGenericContext } from '../../util/createGenericContext';

interface Todo {
  isCompleted: boolean;
  description: string;
}

interface TodoList {
  name: string;
  todos: Todo[];
}

export const useTodoList = () => {
  const [todoList, setTodoLists] = useState<TodoList[]>([]);

  return { todoList, setTodoLists };
};

export const {
  GenericContext: TodoListContext,
  GenericContextProvider: TodoListContextProvider,
} = createGenericContext(useTodoList);
