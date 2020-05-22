/**@jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import { CheckSquareOutlined, BorderOutlined, DeleteOutlined } from '@ant-design/icons';

interface Props {
  description: string;
  dispose: () => void;
}

export const Todo = (props: Props) => {
  const [description, setDescription] = useState(props.description);
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <li
      style={{
        display: 'grid',
        gridTemplateColumns: 'max-content 1fr max-content',
        fontSize: '2rem',
        alignItems: 'center',
        gap: '.25rem',
      }}>
      <span
        style={{ cursor: 'pointer' }}
        onClick={(event) => {
          setIsCompleted((status) => !status);
        }}>
        {isCompleted ? <CheckSquareOutlined style={{ color: 'green' }} /> : <BorderOutlined />}
      </span>
      <input
        css={{
          color: isCompleted ? 'gray' : '',
          fontSize: '2rem',
          border: 0,
          '&:focus': { outline: 'none', fontStyle: 'italic' },
        }}
        type="text"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        onKeyDown={(event) => {
          if (['Enter', 'Escape'].includes(event.key)) {
            (event.target as HTMLInputElement).blur();
          }
        }}
      />
      <DeleteOutlined onClick={props.dispose} style={{ color: '#ff5722', cursor: 'pointer' }} />
    </li>
  );
};

export default Todo;
