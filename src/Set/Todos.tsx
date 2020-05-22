/**@jsx jsx */
import { jsx } from '@emotion/core';
import { useState, useEffect, useRef } from 'react';
import { FormOutlined } from '@ant-design/icons';

import Todo from './Todo';

interface Props {
  isShowingNewTodoInput: boolean;
}

export const Todos = (props: Props) => {
  const [description, setDescription] = useState('');
  const [id, setId] = useState(0);
  const [todos, setTodos] = useState<{ id: number; todo: JSX.Element }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.isShowingNewTodoInput) {
      inputRef.current?.focus();
    }
  }, [props.isShowingNewTodoInput]);

  const createTodo = (id: number, description: string) => ({
    id,
    todo: (
      <Todo
        key={id}
        description={description}
        dispose={() => setTodos((todos) => todos.filter((todo) => todo.id !== id))}
      />
    ),
  });

  const newTodo = () => {
    setTodos((todos) => [...todos, createTodo(id, description)]);
    setId((id) => ++id);
    setDescription('');
  };

  return (
    <div style={{ display: 'grid', padding: '0 1rem' }}>
      <header
        style={{
          display: props.isShowingNewTodoInput ? 'grid' : 'none',
          gridTemplateColumns: '1fr max-content',
          fontSize: '2rem',
          alignItems: 'center',
          gap: '.25rem',
        }}>
        <input
          ref={inputRef}
          style={{ fontSize: '2rem' }}
          type="text"
          placeholder="Create a todo"
          autoFocus
          onKeyDown={(event) => {
            if (event.key === 'Enter' && description) {
              newTodo();
            }
          }}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <FormOutlined
          css={{
            color: description ? '#03a9f4' : 'gray',
            '&:focus': { outline: 'none' },
            '& svg': { cursor: description ? 'pointer' : 'not-allowed' },
          }}
          onClick={() => {
            if (description) {
              newTodo();
            }
          }}
        />
      </header>
      <ul
        style={{
          display: 'grid',
          gap: '.5rem',
          listStyleType: 'none',
          padding: 0,
        }}>
        {todos.map((todo) => todo.todo)}
      </ul>
    </div>
  );
};

export default Todos;
