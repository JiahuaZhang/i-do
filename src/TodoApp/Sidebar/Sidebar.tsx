/**@jsx jsx */
import { jsx } from '@emotion/react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentTaskIndex } from '../../state/todo/currentTask';
import { todoState } from '../../state/todo/todo';
import { NewTask } from './NewTask';
import { SidebarTask } from './SidebarTask';

interface Props {}

export const Sidebar = (props: Props) => {
  const setCurrentIndex = useSetRecoilState(currentTaskIndex);
  const [tasks, setTasks] = useRecoilState(todoState);

  return (
    <aside
      style={{
        background: 'linear-gradient(0deg, rgba(45,0,247,0.7) 0%, rgba(106,0,244,0.6) 100%)',
        color: 'white',
        fontSize: '1.5rem',
        padding: '.75rem',
      }}>
      <DragDropContext
        onDragStart={(initial) => setCurrentIndex(initial.source.index)}
        onDragEnd={(result) => {
          if (!result.destination) return;

          const { source, destination } = result;
          if (source.index === destination.index) return;

          setTasks((values) => {
            const copy = [...values];

            const dragging = copy[source.index];
            copy.splice(source.index, 1);
            copy.splice(destination.index, 0, dragging);

            return copy;
          });

          setCurrentIndex(destination.index);
        }}>
        <Droppable droppableId='tasks'>
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                marginBottom: '1rem',
                display: 'grid',
                gap: '.25rem',
              }}>
              {tasks.map((task, index) => (
                <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
                  {(p, snapshot) => (
                    <SidebarTask provided={p} snapshot={snapshot} task={task} index={index} />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <NewTask />
    </aside>
  );
};
