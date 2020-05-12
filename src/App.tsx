import React, { useState } from 'react';
import { BorderOutlined, DeleteOutlined, CheckSquareOutlined } from '@ant-design/icons';

function App() {
  const [todos, setTodos] = useState<{ description: string; completed: boolean }[]>([]);

  return (
    <div style={{ display: 'grid' }}>
      <input
        style={{ fontSize: '2rem', margin: '0.75rem 2rem' }}
        type="text"
        autoFocus
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            const target = event.target as HTMLInputElement;
            const { value: description } = target;
            setTodos((todos) => [...todos, { description, completed: false }]);
            target.value = '';
          }
        }}
      />
      <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 2.5rem', fontSize: '2rem' }}>
        {todos.map((todo, index) => (
          <li
            key={`${todo.description}-${index}`}
            style={{
              borderBottom: '1px solid #2196f3',
              display: 'grid',
              gridTemplateColumns: 'max-content 1fr max-content',
              alignItems: 'center',
              color: todo.completed ? 'gray' : '',
              marginBottom: '.8rem',
              gap: '.25rem',
            }}>
            <span
              style={{ cursor: 'pointer' }}
              onClick={(event) => {
                setTodos((todos) =>
                  todos.map((todo, i) => {
                    if (index === i) {
                      return { ...todo, completed: !todo.completed };
                    } else {
                      return todo;
                    }
                  })
                );
              }}>
              {todo.completed ? (
                <CheckSquareOutlined style={{ color: 'green' }} />
              ) : (
                <BorderOutlined />
              )}
            </span>
            {todo.description}
            <DeleteOutlined
              onClick={(event) => {
                setTodos((todos) => todos.filter((_, i) => i !== index));
              }}
              style={{ color: '#ff5722', cursor: 'pointer' }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
