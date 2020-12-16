/**@jsx jsx */
import { jsx } from '@emotion/react';
import { PlusOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentTask } from '../../state/todo/currentTask';

interface Props {}

export const NewTodo = (props: Props) => {
  const [todoDescription, setTodoDescription] = useState('');
  const [task, setTask] = useRecoilState(currentTask);

  const createTodo = () => {
    if (!task) return;

    const ids = new Array(task.todos.length + 1);
    task.todos.map((todo) => (ids[todo.id] = true));
    const id = ids.findIndex((value) => !value);
    const newTask = {
      ...task,
      todos: [
        ...task.todos,
        {
          description: todoDescription,
          id,
          isCompleted: false,
        },
      ],
    };
    setTask(newTask);
  };

  return (
    <Input
      css={{
        border: 'none',
        '& *': { fontSize: '1.25rem' },
        '& > span': { width: '95%', margin: '0 auto' },
        '& > span:focus-within': { borderBottom: '1px solid #096dd9' },
        '& span': { background: 'white', border: 'none' },
        '& input': { border: 'none', color: '#096dd9' },
        '& input:focus': { boxShadow: 'none' },
      }}
      placeholder='Add a todo'
      addonBefore={
        <PlusOutlined
          style={{
            color: todoDescription ? '#096dd9' : '#69c0ff',
            cursor: todoDescription ? 'pointer' : 'not-allowed',
          }}
          onClick={() => {
            if (todoDescription) {
              createTodo();
              setTodoDescription('');
            }
          }}
        />
      }
      value={todoDescription}
      onChange={(e) => setTodoDescription(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setTodoDescription('');
        } else if (e.key === 'Enter') {
          createTodo();
          setTodoDescription('');
        }
        e.stopPropagation();
      }}
    />
  );
};
