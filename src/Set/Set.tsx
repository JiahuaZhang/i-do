/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useState, useContext, useEffect } from 'react';
import { DeleteOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

import Todos from './Todo/Todos';
import { SetContext, Set as SetInterface } from './SetContext';

interface Props {
  setId: number;
  dispose: () => void;
}

export const Set = (props: Props) => {
  const [isShowingNewTodoInput, setIsShowingNewTodoInput] = useState(true);
  const { state, updateSet } = useContext(SetContext);
  const currentSet = state.sets.find(({ setId }) => setId === props.setId) as SetInterface;
  const [name, setName] = useState(currentSet.name);

  useEffect(() => {
    updateSet({ ...currentSet, name });
  }, [name, updateSet, currentSet]);

  return (
    <div style={{ margin: '.5rem 0' }}>
      <header
        style={{
          display: 'grid',
          gridTemplateColumns: 'max-content 1fr max-content',
          fontSize: '2.5rem',
        }}>
        <span
          style={{ cursor: 'pointer' }}
          onClick={(event) => setIsShowingNewTodoInput((status) => !status)}>
          {isShowingNewTodoInput ? (
            <CaretUpOutlined style={{ color: '#00bcd4' }} />
          ) : (
            <CaretDownOutlined style={{ color: '#00bcd4' }} />
          )}
        </span>
        <input
          css={{
            '&:focus': { outline: 0, textDecoration: 'underline' },
            fontSize: '2.5rem',
            border: 0,
            textAlign: 'center',
          }}
          type='text'
          value={name}
          onChange={(event) => setName(event.target.value)}
          onKeyDown={(event) => {
            if (['Enter', 'Escape'].includes(event.key)) {
              (event.target as HTMLInputElement).blur();
            }
          }}
        />
        <DeleteOutlined style={{ color: '#ff5722', cursor: 'pointer' }} onClick={props.dispose} />
      </header>
      <Todos setId={props.setId} isShowingNewTodoInput={isShowingNewTodoInput} />
    </div>
  );
};

export default Set;
