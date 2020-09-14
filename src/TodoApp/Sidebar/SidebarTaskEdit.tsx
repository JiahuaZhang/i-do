import React, { useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { useSetRecoilState } from 'recoil';

import { Status } from './SidebarTask';
import { currentTaskName } from '../../state/todo/currentTask';

interface Props {
  isShowing: boolean;
  taskName: string;
  setState: Dispatch<SetStateAction<Status>>;
}

export const SidebarTaskEdit = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isShowing, taskName, setState } = props;
  const setCurrentTaskName = useSetRecoilState(currentTaskName);

  useEffect(() => {
    if (isShowing) {
      inputRef.current?.focus();
    }
  }, [inputRef, isShowing]);

  return (
    <div
      style={{
        visibility: isShowing ? 'visible' : 'hidden',
        height: isShowing ? '100%' : 0,
      }}>
      <input
        ref={inputRef}
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
        defaultValue={taskName}
      />
    </div>
  );
};
