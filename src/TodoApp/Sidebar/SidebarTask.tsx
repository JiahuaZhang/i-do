/**@jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { Task } from '../../state/todo/todo';
import { currentTaskIndex } from '../../state/todo/currentTask';
import { SidebarTaskDefault } from './SidebarTaskDefault';
import { SidebarTaskFocus } from './SidebarTaskFocus';
import { SidebarTaskEdit } from './SidebarTaskEdit';

interface Props {
  task: Task;
  index: number;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  [key: string]: any;
}

export type Status = 'default' | 'focus' | 'edit';

export const SidebarTask = (props: Props) => {
  const { task, index, provided, snapshot } = props;
  const [currentIndex, setCurrentIndex] = useRecoilState(currentTaskIndex);
  const [state, setState] = useState<Status>('default');
  const [needRestoreDefault, setNeedRestoreDefault] = useState(false);
  const [liHtml, setLiHtml] = useState<HTMLLIElement | null>(null);

  useEffect(() => {
    if (snapshot.isDragging) setState('default');
  }, [snapshot.isDragging]);

  useEffect(() => {
    if (index !== currentIndex && state !== 'default') {
      setState('default');
    }
  }, [state, index, currentIndex]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (liHtml && liHtml.contains(event.target as Node)) {
        setState('default');
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [liHtml]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setState('default');
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [liHtml]);

  return (
    <li
      ref={(ref) => {
        provided.innerRef(ref);
        setLiHtml(ref);
      }}
      {...provided.dragHandleProps}
      {...provided.draggableProps}
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
        } else if (!snapshot.isDragging) {
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
        display: 'grid',
        overflow: 'hidden',
        ':hover': {
          background: '#673ab74d',
        },
      }}>
      <SidebarTaskDefault taskName={task.name} isShowing={state === 'default'} />
      <SidebarTaskFocus
        index={index}
        isShowing={state === 'focus'}
        setState={setState}
        taskName={task.name}
      />
      <SidebarTaskEdit isShowing={state === 'edit'} setState={setState} taskName={task.name} />
    </li>
  );
};
