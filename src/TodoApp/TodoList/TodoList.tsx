import React from 'react';
import { useRecoilValue } from 'recoil';

import { currentTaskName } from '../../state/todo/currentTask';

interface Props {}

export const TodoList = (props: Props) => {
  const taskName = useRecoilValue(currentTaskName);

  return (
    <section
      style={{
        background: 'linear-gradient(0deg, rgb(255 234 0 / 75%) 0%, rgb(250 239 100 / 0.7) 50%)',
        display: 'grid',
        gridTemplateRows: 'max-content 1fr',
      }}>
      <header style={{ justifySelf: 'center', fontSize: '2.5rem', color: taskName ? '' : 'gray' }}>
        {taskName || 'task name?'}
      </header>
      <main>showing list of todos associated with this group</main>
    </section>
  );
};
