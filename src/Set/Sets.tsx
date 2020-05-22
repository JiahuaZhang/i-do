/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState, Fragment } from 'react';
import { FileAddOutlined, LeftOutlined } from '@ant-design/icons';

import Set from './Set';

interface Props {}

export const Sets = (props: Props) => {
  const [name, setName] = useState('');
  const [sets, setSets] = useState<{ id: number; content: JSX.Element }[]>([]);
  const [id, setId] = useState(0);
  const [showToggleNewSet, setshowToggleNewSet] = useState(false);

  const createSet = (id: number, name: string) => ({
    id,
    content: (
      <Set name={name} dispose={() => setSets((values) => values.filter((v) => v.id !== id))} />
    ),
  });

  const newSet = () => {
    setSets((values) => [...values, createSet(id, name)]);
    setId((id) => ++id);
    setName('');
    setshowToggleNewSet(false);
  };

  const NewSet = ({ ...props }) => (
    <div {...props}>
      <input
        autoFocus
        type="text"
        placeholder="Create a set"
        style={{ fontSize: '2rem' }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && name) {
            newSet();
          } else if (event.key === 'Escape') {
            setName('');
            setshowToggleNewSet(false);
          }
        }}
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <FileAddOutlined
        onClick={(event) => {
          if (name) {
            newSet();
          }
        }}
        css={{
          color: name ? '#03a9f4' : 'gray',
          '&:focus': { outline: 'none' },
          '& svg': { cursor: name ? 'pointer' : 'not-allowed' },
        }}
      />
    </div>
  );

  return (
    <div style={{ margin: '.5rem auto', maxWidth: '70rem' }}>
      <NewSet
        style={{
          display: sets.length ? 'none' : 'grid',
          gridTemplateColumns: '1fr max-content',
          alignItems: 'center',
          fontSize: '2.3rem',
          gap: '.2rem',
        }}
      />
      <div>
        {sets.map(({ id, content }) => (
          <div key={id}>{content}</div>
        ))}
      </div>
      <div
        style={{
          display: sets.length ? 'grid' : 'none',
          marginTop: '.25rem',
          gridTemplateColumns: 'repeat(2, max-content)',
          alignItems: 'center',
          gap: '.5rem',
        }}>
        <button
          css={{
            fontSize: '1.75rem',
            padding: '.5rem',
            backgroundColor: '#1890ff',
            color: 'white',
            borderRadius: '1rem',
            cursor: 'pointer',
            '&:hover': {
              color: '#1890ff',
              background: 'white',
            },
            justifySelf: 'left',
          }}
          onClick={(event) => {
            setshowToggleNewSet((status) => !status);
            (event.target as HTMLInputElement).blur();
          }}>
          {showToggleNewSet ? (
            <LeftOutlined />
          ) : (
            <Fragment>
              <FileAddOutlined />
              Create a new set
            </Fragment>
          )}
        </button>
        <NewSet
          style={{
            gridTemplateColumns: '1fr max-content',
            alignItems: 'center',
            fontSize: '2.3rem',
            gap: '.2rem',
            display: showToggleNewSet ? '' : 'none',
          }}
        />
      </div>
    </div>
  );
};

export default Sets;
