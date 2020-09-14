import React from 'react';

interface Props {
  isShowing: boolean;
  taskName: string;
}

export const SidebarTaskDefault = (props: Props) => {
  const { isShowing, taskName } = props;

  return (
    <div
      style={{
        visibility: isShowing ? 'visible' : 'hidden',
        height: isShowing ? '100%' : 0,
      }}>
      {taskName || <span style={{ color: 'yellow' }}>task name?</span>}
    </div>
  );
};
