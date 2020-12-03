/**@jsx jsx */
import { jsx } from '@emotion/react';
import { useRef, useEffect, Dispatch, SetStateAction, useState } from 'react';
import { useRecoilState } from 'recoil';
import { CheckOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Status } from './SidebarTask';
import { currentTaskName } from '../../state/todo/currentTask';

interface Props {
  isShowing: boolean;
  taskName: string;
  setState: Dispatch<SetStateAction<Status>>;
}

export const SidebarTaskEdit = (props: Props) => {
  const inputRef = useRef<Input>(null);
  const { isShowing, taskName, setState } = props;
  const [currentTask, setCurrentTaskName] = useRecoilState(currentTaskName);
  const [value, setValue] = useState(currentTask);

  useEffect(() => {
    if (isShowing) {
      inputRef.current?.focus();
    }
  }, [inputRef, isShowing]);

  useEffect(() => setValue(currentTask), [currentTask]);

  return (
    <div
      style={{
        visibility: isShowing ? 'visible' : 'hidden',
        height: isShowing ? '100%' : 0,
      }}>
      <Input
        autoFocus
        ref={inputRef}
        defaultValue={taskName}
        onClick={(e) => e.stopPropagation()}
        css={{
          fontSize: '1.25rem',
          borderRadius: 5,
          border: 'none',
          transition: 'none',
          '& *': { transition: 'none' },
          '& input': { fontSize: '1.25rem', borderRadius: 5 },
        }}
        value={value}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            setCurrentTaskName(value);
            setState('default');
            event.stopPropagation();
          } else if (event.key === 'Escape') {
            if (currentTask === value) {
              event.stopPropagation();
              setState('default');
            }
            setValue(currentTask);
          }
        }}
        onChange={(event) => setValue(event.target.value)}
        addonAfter={
          value && (
            <CheckOutlined
              onClick={() => {
                setCurrentTaskName(value);
              }}
            />
          )
        }
      />
    </div>
  );
};
