import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React, { useState } from 'react';

interface Props {}

export const NewTask = (props: Props) => {
  const [state, setState] = useState<'default' | 'new'>('new');
  const [taskName, setTaskName] = useState('');

  return (
    <section style={{ cursor: 'pointer', border: '1px solid tomato' }}>
      {state === 'default' && (
        <div
          onClick={() => setState('new')}
          style={{
            display: 'grid',
            gridTemplateColumns: 'max-content 1fr',
            alignItems: 'end',
            gap: '.5rem',
          }}>
          <PlusOutlined />
          new list
        </div>
      )}

      {state === 'new' && (
        <Input
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          style={{ display: 'block', fontSize: '1.5rem', width: '100%' }}
          addonAfter={<CheckOutlined />}
        />
      )}
    </section>
  );
};
