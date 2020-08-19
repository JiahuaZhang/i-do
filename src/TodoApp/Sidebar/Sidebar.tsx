/**@jsx jsx */
import { jsx } from '@emotion/core';
import { useContext } from 'react';

import { TodoListManagerContext } from '../Context/TodoListManagerContext';

interface Props {}

export const Sidebar = (props: Props) => {
  const { todoList } = useContext(TodoListManagerContext);

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
        {todoList.map((list, index) => (
          <li key={index}>
            <input
              // on change, passing argument? new key value, index
              type="text"
              defaultValue={list.name}
              css={{
                fontSize: '1.5rem',
                background: 'transparent',
                color: 'white',
                border: 'none',
                paddingLeft: '1rem',
                ':focus': {
                  color: 'yellow',
                  outline: 'none',
                  fontStyle: 'italic',
                },
              }}
            />
          </li>
        ))}
      </ul>
      <section>new list</section>
    </aside>
  );
};
