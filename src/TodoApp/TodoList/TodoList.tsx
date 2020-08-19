import React from 'react';

interface Props {}

export const TodoList = (props: Props) => {
  return (
    <section style={{ background: 'yellow' }}>
      <header>group name, creating new todo stuff</header>
      <main>showing list of todos associated with this group</main>
    </section>
  );
};
