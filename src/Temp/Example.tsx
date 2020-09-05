import React, { useState, useEffect } from 'react';
import { useMotionValue, useAnimation } from 'framer-motion';

interface Props {}

const initialItems = [0, 1, 2, 3, 4];
const [height, padding, size] = [70, 10, 150];

export const Example = (props: Props) => {
  const y = useMotionValue(0);

  const [items, setItems] = useState(initialItems);
  const { top, bottom } = useConstraints(items);
  const controls = useAnimation();
  const totalScroll = getHeight(items);
  const scrollContainer = 150;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 30,
        backgroundColor: 'transparent',
        overflow: 'hidden',
        position: 'relative',
        transform: 'translateZ(0)',
      }}></div>
  );
};

const getHeight = (items: number[]) => {
  const totalHeight = items.length * height;
  const totalPadding = (items.length - 1) * padding;
  const totalScroll = totalHeight + totalPadding;
  return totalScroll;
};

const useConstraints = (items: number[]) => {
  const [constraints, setConstraints] = useState({ top: 0, bottom: 0 });

  useEffect(() => {
    setConstraints({ top: size - getHeight(items), bottom: 0 });
  }, [items]);

  return constraints;
};
