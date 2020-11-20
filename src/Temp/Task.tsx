import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Task as TaskType } from './initial-data';

interface Props {
  task: TaskType;
  index: number;
  [key: string]: any;
}

const Container = styled.div<{ isDragging: boolean; isDragDisabled: boolean; [key: string]: any }>`
  // border: 3px solid lightgrey;
  border: 1px solid lightgrey;
  // border-radius: 50%;
  border-radius: 2px;
  padding: 8px;
  // margin-right: 8px;
  margin-bottom: 8px;
  background-color: ${(props) =>
    props.isDragDisabled ? 'lightgray' : props.isDragging ? 'lightgreen' : 'white'};
  // display: flex;
  // width: 40px;
  // height: 40px;
  // justify-content: center;
  // align-items: center;

  &:focus {
    outline: none;
    border-color: red;
  }
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 4px;
`;

export const Task = (props: Props) => {
  const isDragDisabled = false;
  // const isDragDisabled = props.task.id === 'task-1';
  return (
    <Draggable draggableId={props.task.id} index={props.index} isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          isDragging={snapshot.isDragging}
          isDragDisabled={isDragDisabled}>
          {/* <Handle {...provided.dragHandleProps} /> */}
          {props.task.content}
        </Container>
      )}
    </Draggable>
  );
};
