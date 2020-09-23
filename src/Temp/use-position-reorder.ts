import { clamp, distance } from 'popmotion';
import { useState, useRef } from 'react';
import move from 'array-move';

export interface Position {
  top: number;
  height: number;
}

export const usePositionReorder = (
  initialState: number[]
): [number[], (i: number, offset: Position) => void, (i: number, dragOffset: number) => void] => {
  const [order, setOrder] = useState(initialState);

  const positions = useRef<Position[]>([]).current;
  const updatePosition = (i: number, offset: Position) => {
    positions[i] = offset;
    // console.log(positions);
  };

  const updateOrder = (i: number, dragOffset: number) => {
    const targetIndex = findIndex(i, dragOffset, positions);
    if (targetIndex !== i) setOrder(move(order, i, targetIndex));
  };

  return [order, updatePosition, updateOrder];
};

const buffer = 30;

export const findIndex = (i: number, yOffset: number, positions: Position[]) => {
  console.log(yOffset);
  let target = i;
  const { top, height } = positions[i];
  const bottom = top + height;

  if (yOffset > 0) {
    const nextItem = positions[i + 1];
    if (!nextItem) return i;

    const swapOffset = distance(bottom, nextItem.top + nextItem.height / 2) + buffer;
    if (yOffset > swapOffset) target = i + 1;
  } else if (yOffset < 0) {
    const prevItem = positions[i - 1];
    if (!prevItem) return i;

    const prevBottom = prevItem.top + prevItem.height;
    const swapOffset = distance(top, prevBottom - prevItem.height / 2) + buffer;
    if (yOffset < -swapOffset) target = i - 1;
  }

  return clamp(0, positions.length, target);
};
