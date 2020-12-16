/**@jsx jsx */
import { jsx } from '@emotion/react';
import { DeleteOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentTaskTodo } from '../../state/todo/currentTask';

interface Props {
  id: number;
  setState: React.Dispatch<React.SetStateAction<'default' | 'edit'>>;
  visible: boolean;
}

export const TodoItemEdit = (props: Props) => {
  const { id, setState, visible } = props;
  const [todo, setTodo] = useRecoilState(currentTaskTodo(id));
  const [description, setDescription] = useState(todo?.description);
  const ref = useRef<Input>(null);

  useEffect(() => {
    if (visible) ref.current?.input.focus();
  }, [visible]);

  return (
    <Input
      ref={ref}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          if (description !== todo?.description) {
            setDescription(todo?.description);
          } else {
            setState('default');
          }
        } else if (e.key === 'Enter') {
          const newTodo = { ...todo, description };
          setTodo(newTodo as any);
          setState('default');
        }
        e.stopPropagation();
      }}
      css={{
        width: visible ? '100%' : 0,
        height: visible ? '100%' : 0,
        '& span': { display: visible ? '' : 'none' },
        '& input': { fontSize: '1.5rem' },
        '& svg': {
          color: '#cf1322',
        },
        '& > span > span': { cursor: 'pointer' },
        '& > span > span:hover': {
          background: '#cf1322',
        },
        '& > span > span:hover svg': {
          color: 'white',
        },
      }}
      defaultValue={todo?.description}
      addonAfter={<DeleteOutlined onClick={() => setTodo(null)} />}
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
  );
};
