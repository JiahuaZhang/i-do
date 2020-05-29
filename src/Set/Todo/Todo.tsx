/**@jsx jsx */
import { jsx } from '@emotion/core';
import { useState, useContext, useEffect } from 'react';
import { CheckSquareOutlined, BorderOutlined, DeleteOutlined } from '@ant-design/icons';
import { SetContext, Todo as TodoInterface } from '../SetContext';

interface Props {
  setId: number;
  todoId: number;
}

export const Todo = (props: Props) => {
  const { state, updateTodo, deleteTodo } = useContext(SetContext);
  const todo = state.sets
    .find((value) => value.setId === props.setId)
    ?.todos.find((val) => val.todoId === props.todoId) as TodoInterface;
  const [description, setDescription] = useState(todo.description);
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

  useEffect(() => {
    updateTodo(props.setId, { ...todo, description });
  }, [description, updateTodo, props.setId, todo]);

  useEffect(() => {
    updateTodo(props.setId, { ...todo, isCompleted });
  }, [isCompleted, updateTodo, props.setId, todo]);

  return (
    <li
      style={{
        display: 'grid',
        gridTemplateColumns: 'max-content 1fr max-content',
        fontSize: '2rem',
        alignItems: 'center',
        gap: '.25rem',
      }}>
      <span style={{ cursor: 'pointer' }} onClick={(event) => setIsCompleted((status) => !status)}>
        {isCompleted ? <CheckSquareOutlined style={{ color: 'green' }} /> : <BorderOutlined />}
      </span>
      <input
        css={{
          color: isCompleted ? 'gray' : '',
          fontSize: '2rem',
          border: 0,
          '&:focus': { outline: 'none', fontStyle: 'italic' },
        }}
        type="text"
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
        onKeyDown={(event) => {
          if (['Enter', 'Escape'].includes(event.key)) {
            (event.target as HTMLInputElement).blur();
          }
        }}
      />
      <DeleteOutlined
        onClick={() => deleteTodo(props.setId, props.todoId)}
        style={{ color: '#ff5722', cursor: 'pointer' }}
      />
    </li>
  );
};

export default Todo;
