/**@jsx jsx */
import { jsx } from '@emotion/core';
import { useRecoilValue } from 'recoil';

import { todoState } from '../../state/todo/todo';
import { SidebarTask } from './SidebarTask';

interface Props {}

export const Sidebar = (props: Props) => {
  const tasks = useRecoilValue(todoState);

  return (
    <aside
      style={{
        background: 'linear-gradient(0deg, rgba(45,0,247,0.7) 0%, rgba(106,0,244,0.6) 100%)',
        color: 'white',
        fontSize: '1.5rem',
        padding: '1rem',
      }}>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          marginBottom: '1rem',
          display: 'grid',
          gap: '.25rem',
        }}>
        {tasks.map((task, index) => (
          <SidebarTask task={task} index={index} key={index} />
        ))}
      </ul>
      <section>new list</section>
    </aside>
  );
};
