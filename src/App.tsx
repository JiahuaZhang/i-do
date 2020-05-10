import React, { useState } from 'react';

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
      <ul>
        {todos.map((todo, index) => (
          <li key={`${todo.description}-${index}`}>{todo.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
