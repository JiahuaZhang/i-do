/**@jsx jsx */
import { jsx } from '@emotion/react';
import { Dispatch, SetStateAction, useState, useRef } from 'react';
import { EditFilled, CaretUpOutlined, DeleteFilled } from '@ant-design/icons';
import { useSetRecoilState } from 'recoil';
import { Status } from './SidebarTask';
import { useEscape } from '../../util/useEscape';
import { currentTask } from '../../state/todo/currentTask';

interface Props {
  isShowing: boolean;
  taskName: string;
  setState: Dispatch<SetStateAction<Status>>;
}

export const SidebarTaskFocus = (props: Props) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const setCurrentTask = useSetRecoilState(currentTask);
  const ref = useRef<HTMLDivElement>(null);
  const { isShowing, taskName, setState } = props;

  useEscape(ref, () => setShowConfirmDelete(false));

  return (
    <div
      ref={ref}
      style={{
        visibility: isShowing ? 'visible' : 'hidden',
        height: isShowing ? '100%' : 0,
        display: 'grid',
        transition: 'transform .6s ease-in',
      }}>
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
        <span style={{ color: taskName ? '' : 'transparent' }}>{taskName || 'placeholder'}</span>
        <EditFilled
          style={{ color: '#01fff2', paddingLeft: '1rem' }}
          onClick={(event) => {
            event.stopPropagation();
            setState('edit');
          }}
        />
        {showConfirmDelete ? (
          <CaretUpOutlined
            style={{ color: '#01fff2' }}
            onClick={() => setShowConfirmDelete(false)}
          />
        ) : (
          <DeleteFilled style={{ color: '#ff4243' }} onClick={() => setShowConfirmDelete(true)} />
        )}
      </div>
      {showConfirmDelete && (
        <button
          css={{
            justifySelf: 'right',
            fontSize: '1.1rem',
            background: 'red',
            color: 'white',
            border: 'none',
            borderRadius: 15,
            margin: '5px 0',
            padding: '5px 15px',
            cursor: 'pointer',
            fontWeight: 'bold',
            '&:hover': {
              background: 'white',
              color: 'red',
            },
            '&:focus': {
              outline: 'none',
              color: 'white',
              background: 'gray',
            },
          }}
          onClick={() => {
            if (ref.current) ref.current.style.transform = 'translateX(-100%)';
            setTimeout(() => setCurrentTask(null), 600);
          }}>
          Confirm delete
        </button>
      )}
    </div>
  );
};
