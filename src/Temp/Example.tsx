import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { useMeasurePosition } from './use-measure-position';
import { Position, usePositionReorder } from './use-position-reorder';

interface Props {}

const items = [50, 300, 80, 70, 65];

export const Example = (props: Props) => {
  const [order, updatePosition, updateOrder] = usePositionReorder(items);

  return (
    <ul style={{ listStyle: 'none', width: 300 }}>
      {order.map((height, i) => (
        <Item
          i={i}
          key={height}
          height={height}
          updatePosition={updatePosition}
          updateOrder={updateOrder}
        />
      ))}
    </ul>
  );
};

const Item = (arg: {
  i: number;
  height: number;
  updatePosition: (i: number, offset: Position) => void;
  updateOrder: (i: number, dragOffset: number) => void;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const ref = useMeasurePosition((pos) => {
    updatePosition(i, pos);
    // console.log(i, pos);
  });
  const { i, height, updatePosition, updateOrder } = arg;

  return (
    <li
      style={{
        padding: 0,
        height,
        zIndex: isDragging ? 3 : 1,
        borderRadius: 10,
        marginBottom: 10,
        cursor: 'pointer',
        width: '100%',
      }}>
      <motion.div
        ref={ref}
        layout
        initial={false}
        style={{ background: 'white', height, borderRadius: 5 }}
        whileHover={{ scale: 1.03, boxShadow: '0px 3px 3px rgba(0,0,0,0.15)' }}
        whileTap={{ scale: 1.12, boxShadow: '0px 5px 5px rgba(0,0,0,0.1)' }}
        drag="y"
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        onViewportBoxUpdate={(_viewportBox, delta) => {
          isDragging && updateOrder(i, delta.y.translate);
        }}
      />
    </li>
  );
};
