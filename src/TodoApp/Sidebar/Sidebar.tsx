/**@jsx jsx */
import { jsx } from '@emotion/core';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { todoState } from '../../state/todo/todo';
import { SidebarTask } from './SidebarTask';

interface Props {}

export const Sidebar = (props: Props) => {
  const [tasks, setTasks] = useRecoilState(todoState);

  return (
    <aside
      style={{
        background: 'linear-gradient(0deg, rgba(45,0,247,0.7) 0%, rgba(106,0,244,0.6) 100%)',
        color: 'white',
        fontSize: '1.5rem',
        padding: '1rem',
      }}>
      <DragDropContext
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
                  {(p) => <SidebarTask provided={p} task={task} index={index} />}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <section>new list</section>
    </aside>
  );
};
