/**@jsx jsx */
import { jsx } from '@emotion/react';
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import { Input, Popconfirm } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentTask, currentTaskName } from '../../state/todo/currentTask';
import { useEscape } from '../../util/useEscape';

interface Props {}

export const TodoHeader = (props: Props) => {
  const [state, setState] = useState<'default' | 'edit'>('default');
  const [taskName, setTaskName] = useRecoilState(currentTaskName);
  const setCurrentTask = useSetRecoilState(currentTask);
  const [name, setName] = useState(taskName);
  const ref = useRef(null);

  useEscape(ref, () => setState('default'));

  useEffect(() => setName(taskName), [taskName]);

  return (
    <header style={{ width: '100%' }} ref={ref}>
      {state === 'default' && (
        <h1
          style={{
            color: taskName ? '' : 'gray',
            margin: '.5rem 0',
            textAlign: 'center',
            fontSize: '1.75rem',
          }}
          onClick={(event) => {
            console.log('click to toggle');
            event.stopPropagation();
            setState('edit');
          }}>
          {taskName || 'task name ?'}
        </h1>
      )}

      {state === 'edit' && (
        <div
          css={{
            display: 'grid',
            gridTemplateColumns: 'max-content 1fr',
            fontSize: '2rem',
            margin: '.5rem .5rem',
            gap: '.5rem',
            alignItems: 'center',
            '& input': {
              fontSize: '1.25rem',
            },
          }}>
          <Popconfirm
            title='Confirm to delete this taks'
            onCancel={(event) => event?.stopPropagation()}
            onConfirm={() => setCurrentTask(null)}>
            <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
          </Popconfirm>
          <Input
            autoFocus
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                if (taskName === name) {
                  setState('default');
                  return;
                }
                setName(taskName);
              } else if (e.key === 'Enter') {
                setTaskName(name);
                setState('default');
              }
              e.stopPropagation();
            }}
            style={{ fontSize: '1.25rem' }}
            addonAfter={
              name && (
                <CheckOutlined
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setTaskName(name);
                    setState('default');
                  }}
                />
              )
            }
          />
        </div>
      )}
    </header>
  );
};
