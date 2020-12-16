/**@jsx jsx */
import { jsx } from '@emotion/react';
import { Sidebar } from './Sidebar/Sidebar';
import { TodoMain } from './TodoMain/TodoMain';

interface Props {}

const breakpoints = [576, 768, 992, 1200];
const media_query = breakpoints.map((point) => `@media (min-width: ${point}px)`);

export const TodoAppLayout = (props: Props) => {
  return (
    <div
      css={{
        margin: '1rem',
        display: 'grid',
        [media_query[0]]: {},
        [media_query[1]]: {
          margin: '1rem 2rem',
          gridTemplateColumns: 'minmax(min-content, 400px) 1fr',
        },
        [media_query[2]]: {
          margin: '1rem 3rem',
          gridTemplateColumns: 'minmax(400px max-content) 1fr',
        },
        [media_query[3]]: { margin: '1rem 4rem' },
      }}>
      <Sidebar />
      <TodoMain />
    </div>
  );
};
