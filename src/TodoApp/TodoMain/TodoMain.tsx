import React from 'react';
import { TodoHeader } from './TodoHeader';
import { TodoList } from './TodoList';

interface Props {}

export const TodoMain = (props: Props) => {
  return (
    <section
      style={{
        background: 'linear-gradient(0deg, rgb(255 234 0 / 75%) 0%, rgb(250 239 100 / 0.7) 50%)',
        display: 'grid',
        gridTemplateRows: 'max-content 1fr',
      }}>
      <TodoHeader />
      <TodoList />
    </section>
  );
};
