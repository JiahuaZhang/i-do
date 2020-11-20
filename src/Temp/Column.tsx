import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Column as ColumnType, Task as TaskType } from './initial-data';
import { Task } from './Task';

interface Props {
  column: ColumnType;
  tasks: TaskType[];
  [key: string]: any;
  isDropDisabled?: boolean;
}

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div<{ isDraggingover: boolean; [key: string]: any }>`
  padding: 8px;
  background-color: ${(props) => (props.isDraggingOver ? 'lightgrey' : 'inherit')};
  // background-color: ${(props) => (props.isDraggingOver ? 'skyblue' : 'inherit')};
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 100px;
  // display: flex;
`;

export const Column = (props: Props) => {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>{props.column.title}</Title>
          <Droppable
            droppableId={props.column.id}
            type='task'
            // type={props.column.id === 'column-3' ? 'done' : 'active'}
            isDropDisabled={props.isDropDisabled}
            // direction='horizontal'
          >
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}>
                {props.tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};
