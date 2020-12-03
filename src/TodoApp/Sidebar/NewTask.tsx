/**@jsx jsx */
import { jsx } from '@emotion/react';
import { PlusOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { todoState } from '../../state/todo/todo';
import { useEscape } from '../../util/useEscape';

interface Props {}

export const NewTask = (props: Props) => {
  const [state, setState] = useState<'default' | 'new'>('default');
  const [taskName, setTaskName] = useState('');
  const setTodo = useSetRecoilState(todoState);
  const ref = useRef<HTMLElement>(null);

  useEscape(ref, () => setState('default'));

  const createTask = () => {
    setTodo((todos) => {
      const ids = new Array(todos.length + 1);
      todos.map((t) => (ids[t.id] = true));
      const id = ids.findIndex((id) => !id);
      const newTodos = [...todos, { name: taskName, todos: [], id }];

      setTaskName('');
      setState('default');

      return newTodos;
    });
  };

  return (
    <section ref={ref}>
      {state === 'default' && (
        <div
          onClick={(event) => {
            setState('new');
            event.stopPropagation();
          }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'max-content 1fr',
            alignItems: 'center',
            gap: '.5rem',
            cursor: 'pointer',
          }}>
          <PlusOutlined />
          new list
        </div>
      )}

      {state === 'new' && (
        <div>
          <Input
            autoFocus
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                if (!taskName) setState('default');
                else createTask();
              } else if (event.key === 'Escape') {
                setTaskName('');
              }
            }}
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            css={{
              fontSize: '1.25rem',
              '& *': {
                fontSize: '1.25rem',
              },
            }}
            addonAfter={taskName && <PlusOutlined onClick={() => taskName && createTask()} />}
          />
        </div>
      )}
    </section>
  );
};
