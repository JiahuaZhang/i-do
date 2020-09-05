/**@jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, useState, useRef } from 'react';

import { Task, todoState } from '../../state/todo/todo';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentTaskIndex, currentTaskName } from '../../state/todo/currentTask';
import { useEscape } from '../../util/useEscape';
import { EditFilled, DeleteFilled } from '@ant-design/icons';

interface Props {
  task: Task;
  index: number;
}

type Status = 'default' | 'click' | 'edit';

export const SidebarTask = (props: Props) => {
  const { task, index } = props;
  const [currentIndex, setCurrentIndex] = useRecoilState(currentTaskIndex);
  const setTodos = useSetRecoilState(todoState);
  const [state, setState] = useState<Status>('default');
  const [needRestoreDefault, setNeedRestoreDefault] = useState(false);
  const liRef = useRef<HTMLLIElement>(null);
  useEscape(liRef, () => setState('default'));
  const setCurrentTaskName = useSetRecoilState(currentTaskName);

  useEffect(() => {
    if (index !== currentIndex && state !== 'default') {
      setState('default');
    }
  }, [state, index, currentIndex]);

  return (
    <li
      ref={liRef}
      onMouseMove={() => {
        if (currentIndex !== index) {
          return;
        }

        if (state === 'default') {
          setState('click');
          setNeedRestoreDefault(true);
        } else if (state !== 'click') {
          setNeedRestoreDefault(false);
        }
      }}
      onMouseLeave={() => {
        if (needRestoreDefault) {
          setState('default');
          setNeedRestoreDefault(false);
        }
      }}
      onClick={(event) => {
        if (index === currentIndex) {
          setState('click');
          setNeedRestoreDefault(false);
        } else {
          setCurrentIndex(index);
        }
        event.persist();
      }}
      onDoubleClick={() => {
        setState('edit');
      }}
      css={{
        fontSize: '1.5rem',
        background: index === currentIndex ? '#673ab780' : 'transparent',
        color: 'white',
        border: 'none',
        paddingLeft: '1rem',
        borderRadius: '.5rem',
        cursor: 'pointer',
        userSelect: 'none',
        padding: '.3rem .7rem',
        ':hover': {
          background: '#673ab74d',
        },
      }}>
      {state === 'default' && (task.name || <span style={{ color: 'yellow' }}>task name?</span>)}
      {state === 'click' && (
        <div
          css={{
            display: 'grid',
            gridTemplateColumns: '1fr max-content max-content',
            alignItems: 'center',
            gap: '.3rem',
            'svg:focus': {
              outline: 'none',
            },
          }}>
          <span style={{ color: task.name ? '' : 'transparent' }}>
            {task.name || 'placeholder'}
          </span>
          <EditFilled
            style={{ color: '#01fff2', paddingLeft: '1rem' }}
            onClick={(event) => {
              event.stopPropagation();
              event.nativeEvent.stopImmediatePropagation();
              setState('edit');
            }}
          />
          <DeleteFilled
            style={{ color: '#ff4243' }}
            onClick={() => {
              setTodos((todos) => todos.filter((_, i) => i !== index));
              // setCurrentIndex(-1);
            }}
          />
        </div>
      )}
      {state === 'edit' && (
        <input
          style={{
            border: 'none',
            fontSize: '1.5rem',
            outline: 'none',
            borderRadius: 5,
          }}
          onClick={(event) => event.stopPropagation()}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              setState('default');
            }
          }}
          onChange={(event) => setCurrentTaskName(event.target.value)}
          autoFocus
          defaultValue={task.name}
        />
      )}
    </li>
  );
};
