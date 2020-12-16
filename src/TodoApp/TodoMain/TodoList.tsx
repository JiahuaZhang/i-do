import React from 'react';
import { useRecoilValue } from 'recoil';
import { currentTask } from '../../state/todo/currentTask';
import { NewTodo } from './NewTodo';
import { TodoItem } from './TodoItem';

interface Props {}

export const TodoList = (props: Props) => {
  const task = useRecoilValue(currentTask);

  return (
    <main style={{ border: '1px solid tomato' }}>
      <ul style={{ listStyle: 'none', padding: 0, border: '1px solid skyblue' }}>
        {task?.todos.map((todo) => (
          <TodoItem key={todo.id} id={todo.id} />
        ))}
      </ul>
      <NewTodo />
    </main>
  );
};
