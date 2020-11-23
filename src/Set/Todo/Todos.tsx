/**@jsx jsx */
import { jsx } from '@emotion/react';
import { useState, useEffect, useRef, useContext } from 'react';
import { FormOutlined } from '@ant-design/icons';

import Todo from './Todo';
import { SetContext, Set, Todo as TodoInterface } from '../SetContext';

interface Props {
  setId: number;
  isShowingNewTodoInput: boolean;
}

export const Todos = (props: Props) => {
  const { state, addNewTodo } = useContext(SetContext);
  const [description, setDescription] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { todos } = state.sets.find((val) => val.setId === props.setId) as Set;

  useEffect(() => {
    if (props.isShowingNewTodoInput) {
      inputRef.current?.focus();
    }
  }, [props.isShowingNewTodoInput]);

  const addTodo = () => {
    addNewTodo(props.setId, { description } as TodoInterface);
    setDescription('');
    inputRef.current?.focus();
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
          type='text'
          placeholder='Create a todo'
          autoFocus
          onKeyDown={(event) => {
            if (event.key === 'Enter' && description) {
              addTodo();
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
              addTodo();
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
        {todos.map(({ todoId }) => (
          <Todo setId={props.setId} todoId={todoId} key={todoId} />
        ))}
      </ul>
    </div>
  );
};

export default Todos;
