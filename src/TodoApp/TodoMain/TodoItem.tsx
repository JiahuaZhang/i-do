/**@jsx jsx */
import { jsx } from '@emotion/react';
import { Checkbox } from 'antd';
import { useRecoilState } from 'recoil';
import { useEffect, useRef, useState } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { currentTaskTodo } from '../../state/todo/currentTask';
import { TodoItemDefault } from './TodoItemDefault';
import { TodoItemEdit } from './TodoItemEdit';
import { useEscape } from '../../util/useEscape';

interface Props {
  id: number;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}

export const TodoItem = (props: Props) => {
  const [state, setState] = useState<'default' | 'edit'>('default');
  const { id, provided } = props;
  const [todo, setTodo] = useRecoilState(currentTaskTodo(id));
  const ref = useRef(null);

  useEscape(ref, () => setState('default'));

  useEffect(() => provided.innerRef(ref.current), [provided]);

  return (
    <li
      {...provided.dragHandleProps}
      {...provided.draggableProps}
      ref={ref}
      css={{
        display: 'grid',
        gridTemplateColumns: 'max-content 1fr',
        alignItems: 'center',
        gap: '.5rem',
        margin: '0 1rem',
      }}>
      <Checkbox
        checked={todo?.isCompleted}
        onChange={(e) => {
          const newTodo = { ...todo, isCompleted: e.target.checked };
          setTodo(newTodo as any);
        }}
      />

      <TodoItemDefault visible={state === 'default'} id={id} setState={setState} />

      <TodoItemEdit visible={state === 'edit'} id={id} setState={setState} />
    </li>
  );
};
