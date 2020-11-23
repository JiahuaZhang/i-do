/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useState, Fragment, useContext } from 'react';
import { FileAddOutlined, LeftOutlined } from '@ant-design/icons';

import Set from './Set';
import { SetContext } from './SetContext';

interface Props {}

export const Sets = (props: Props) => {
  const { state, addNewSet, deleteSet } = useContext(SetContext);
  const [name, setName] = useState('');
  const [showToggleNewSet, setshowToggleNewSet] = useState(false);

  const newSet = () => {
    addNewSet(name);
    setName('');
    setshowToggleNewSet(false);
  };

  const NewSet = ({ ...props }) => (
    <div {...props}>
      <input
        autoFocus
        type='text'
        placeholder='Create a set'
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
          display: state.sets.length ? 'none' : 'grid',
          gridTemplateColumns: '1fr max-content',
          alignItems: 'center',
          fontSize: '2.3rem',
          gap: '.2rem',
        }}
      />
      <div>
        {state.sets.map(({ setId }) => (
          <Set
            key={setId}
            setId={setId}
            dispose={() => {
              deleteSet(setId);
            }}
          />
        ))}
      </div>
      <div
        style={{
          display: state.sets.length ? 'grid' : 'none',
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
