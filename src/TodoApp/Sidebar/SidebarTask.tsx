/**@jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, useState, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { motion, useAnimation } from 'framer-motion';

import { Task, todoState } from '../../state/todo/todo';
import { currentTaskIndex } from '../../state/todo/currentTask';
import { useEscape } from '../../util/useEscape';
import { SidebarTaskDefault } from './SidebarTaskDefault';
import { SidebarTaskFocus } from './SidebarTaskFocus';
import { SidebarTaskEdit } from './SidebarTaskEdit';

interface Props {
  task: Task;
  index: number;
}

export type Status = 'default' | 'focus' | 'edit';

export const SidebarTask = (props: Props) => {
  const { task, index } = props;
  const [currentIndex, setCurrentIndex] = useRecoilState(currentTaskIndex);
  const setTodos = useSetRecoilState(todoState);
  const [state, setState] = useState<Status>('default');
  const [needRestoreDefault, setNeedRestoreDefault] = useState(false);
  const liRef = useRef<HTMLLIElement>(null);
  const controls = useAnimation();

  useEscape(liRef, () => setState('default'));
  useEffect(() => {
    if (index !== currentIndex && state !== 'default') {
      setState('default');
    }
  }, [state, index, currentIndex]);

  return (
    <motion.li
      draggable
      onDrag={() => {
        console.log('on drag', state);
      }}
      onDragStart={() => {
        console.log('on drag start', state);
      }}
      onDragEnd={() => {
        console.log('on drag end', state);
      }}
      onDragOver={() => {
        console.log('on drag over', state);
      }}
      onDrop={() => {
        console.log('on drop', state);
      }}
      onDragStartCapture={(event) => {
        console.log('on drag start capture', state);
        // setState('edit');
        event.nativeEvent.stopImmediatePropagation();
      }}
      style={{ display: 'grid' }}
      animate={controls}
      ref={liRef}
      onMouseMove={() => {
        if (currentIndex !== index) {
          return;
        }

        if (state === 'default') {
          setState('focus');
          setNeedRestoreDefault(true);
        } else if (state !== 'focus') {
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
          setState('focus');
          setNeedRestoreDefault(false);
        } else {
          setCurrentIndex(index);
        }
        event.nativeEvent.stopImmediatePropagation();
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
      <SidebarTaskDefault taskName={task.name} isShowing={state === 'default'} />
      <SidebarTaskFocus
        controls={controls}
        index={index}
        isShowing={state === 'focus'}
        setState={setState}
        taskName={task.name}
      />
      <SidebarTaskEdit isShowing={state === 'edit'} setState={setState} taskName={task.name} />
    </motion.li>
  );
};
