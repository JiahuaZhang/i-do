import React from 'react';
import { useRecoilValue } from 'recoil';
import { currentTaskTodo } from '../../state/todo/currentTask';

interface Props {
  id: number;
  setState: React.Dispatch<React.SetStateAction<'default' | 'edit'>>;
  visible: boolean;
}

export const TodoItemDefault = (props: Props) => {
  const { id, setState, visible } = props;
  const todo = useRecoilValue(currentTaskTodo(id));

  return (
    <span
      style={{
        cursor: 'text',
        fontSize: '1.5rem',
        padding: '5px 0',
        color: todo?.isCompleted ? '#85a5ff' : 'black',
        display: visible ? '' : 'none',
      }}
      onClick={(e) => {
        setState('edit');
      }}>
      {todo?.description}
    </span>
  );
};
