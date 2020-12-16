import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { currentTask } from '../../state/todo/currentTask';
import { NewTodo } from './NewTodo';
import { TodoItem } from './TodoItem';

interface Props {}

export const TodoList = (props: Props) => {
  const [task, setTask] = useRecoilState(currentTask);

  return (
    <main>
      <DragDropContext
        onDragEnd={(result) => {
          if (!task) return;

          const { source, destination } = result;

          if (!destination) return;

          if (source.droppableId !== 'todo' || destination.droppableId !== 'todo') return;

          const todos = [...task.todos];

          const src = todos[source.index];
          const dest = todos[destination.index];

          todos[source.index] = dest;
          todos[destination.index] = src;

          setTask({ ...task, todos });
        }}>
        <Droppable droppableId='todo'>
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ listStyle: 'none', padding: 0 }}>
              {task?.todos.map((todo, index) => (
                <Draggable draggableId={todo.id.toString()} index={index} key={todo.id}>
                  {(p, snapshot) => <TodoItem provided={p} snapshot={snapshot} id={todo.id} />}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      {task?.name && <NewTodo />}
    </main>
  );
};
