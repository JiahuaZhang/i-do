import React, { useContext, ReactNode, useEffect } from 'react';
import { TodoListContext, TodoListContextProvider } from './TodoListContext';
import { createGenericContext } from '../../util/createGenericContext';

interface Intention {
  description: string;
}

export const useTodoListManager = () => {
  const { todoList, setTodoLists } = useContext(TodoListContext);

  useEffect(() => {
    setTodoLists([
      { name: '九项试炼', todos: [] },
      { name: '9 things', todos: [] },
      { name: 'important', todos: [] },
      { name: 'stars', todos: [] },
      { name: '九项试炼', todos: [] },
      { name: '9 things', todos: [] },
      { name: 'important', todos: [] },
      { name: 'stars', todos: [] },
      { name: '九项试炼', todos: [] },
      { name: '9 things', todos: [] },
      { name: 'important', todos: [] },
      { name: 'stars', todos: [] },
    ]);
  }, [setTodoLists]);

  return { todoList, setTodoLists };
};

export const {
  GenericContext: TodoListManagerContext,
  GenericContextProvider: TodoListManagerContextProvider,
} = createGenericContext(useTodoListManager);

export const WrappedTodoListManagerContextProvider = ({ children }: { children: ReactNode }) => (
  <TodoListContextProvider>
    <TodoListManagerContextProvider>{children}</TodoListManagerContextProvider>
  </TodoListContextProvider>
);
