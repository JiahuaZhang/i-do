import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Column } from './Column';
import { initialData } from './initial-data';
import styled from 'styled-components';

interface Props {}

const Container = styled.div`
  display: flex;
`;

export const Example = (props: Props) => {
  const [state, setState] = useState(initialData);
  return (
    <DragDropContext
      onDragStart={(start, provided) => {
        const homeIndex = state.columnOrder.indexOf(start.source.droppableId);
        setState((values) => ({ ...values, homeIndex }));

        provided.announce(`You have lifted the task in position ${start.source.index} + 1`);
        // document.body.style.color = 'orange';
        // document.body.style.transition = 'background-color 0.2s ease';
      }}
      // onDragUpdate={(update) => {
      //   const { destination } = update;
      //   const opacity = destination ? destination.index / Object.keys(state.tasks).length : 0;
      //   document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
      // }}
      onDragEnd={(result, provided) => {
        // document.body.style.color = 'inherit';
        // document.body.style.backgroundColor = 'inherit';

        provided.announce('done!');
        setState((values) => ({ ...values, homeIndex: undefined }));
        const { destination, source, draggableId, type } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index)
          return;

        if (type === 'column') {
          const newColumnOrder = [...state.columnOrder];
          newColumnOrder.splice(source.index, 1);
          newColumnOrder.splice(destination.index, 0, draggableId);
          setState((values) => ({ ...values, columnOrder: newColumnOrder }));
          return;
        }

        const start = state.columns[source.droppableId];
        const finish = state.columns[destination.droppableId];

        if (start === finish) {
          const newTaskIds = Array.from(start.taskIds);
          newTaskIds.splice(source.index, 1);
          newTaskIds.splice(destination.index, 0, draggableId);

          const newColumn = { ...start, taskIds: newTaskIds };

          const newState = { ...state, columns: { ...state.columns, [newColumn.id]: newColumn } };
          setState(newState);
          return;
        }

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
          ...start,
          taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = { ...finish, taskIds: finishTaskIds };
        const newState = {
          ...state,
          columns: {
            ...state.columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
          },
        };
        setState(newState);
      }}>
      <Droppable droppableId='all-colums' direction='horizontal' type='column'>
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {state.columnOrder.map((columnId, index) => {
              const column = state.columns[columnId]!;
              const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

              const isDropDisabled = false;
              // const isDropDisabled = index < (state.homeIndex || -1);

              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  isDropDisabled={isDropDisabled}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};
