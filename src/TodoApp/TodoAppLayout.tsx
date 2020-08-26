/**@jsx jsx */
import { jsx } from '@emotion/core';

import { Sidebar } from './Sidebar/Sidebar';
import { TodoList } from './TodoList/TodoList';
import { WrappedTodoListManagerContextProvider } from './Context/TodoListManagerContext';

interface Props {}

const breakpoints = [576, 768, 992, 1200];
const media_query = breakpoints.map((point) => `@media (min-width: ${point}px)`);

export const TodoAppLayout = (props: Props) => {
  return (
    <WrappedTodoListManagerContextProvider>
      <div
        css={{
          margin: '1rem',
          [media_query[0]]: {
            display: 'flex',
            '> section': { flexGrow: 1 },
            // aside: { maxWidth: '20rem' },
          },
          [media_query[1]]: { margin: '1rem 2rem' },
          [media_query[2]]: { margin: '1rem 3rem' },
          [media_query[3]]: { margin: '1rem 4rem' },
        }}>
        <Sidebar />
        <TodoList />
      </div>
    </WrappedTodoListManagerContextProvider>
  );
};