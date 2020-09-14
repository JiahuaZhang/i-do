import React, { useState, useEffect } from 'react';
import { useMotionValue, useAnimation, motion } from 'framer-motion';

interface Props {}

const initialItems = [0, 1, 2, 3, 4];
const [height, padding, size] = [70, 10, 150];

const Item = ({
  total,
  index,
  onDelete,
}: {
  total: number;
  index: number;
  onDelete: (i: number) => void;
}) => {
  const controls = useAnimation();
  console.log(controls);

  return (
    <motion.div
      style={{
        width: 150,
        height,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: total - 1 === index ? 0 : 10,
        willChange: 'transform',
        cursor: 'grab',
      }}
      whileTap={{ cursor: 'grabbing' }}
      transition={{ type: 'spring', stiffness: 600, damping: 30 }}>
      <motion.div
        style={{ width: size, height, borderRadius: 20, backgroundColor: '#fff' }}
        drag="x"
        dragDirectionLock
        onDragEnd={async (event, info) => {
          const offset = info.offset.x;
          const velocity = info.velocity.x;

          console.log('on drag end');
          console.log(info);

          if (offset < -100 || velocity < -500) {
            await controls.start({
              x: '-100%',
              transition: { duration: 0.2 },
            });

            onDelete(index);
          } else {
            console.log('on drag end, should restore??');
            controls.start({ x: -10, opacity: 1, transition: { duration: 0.5 } });
          }
        }}
        animate={controls}
      />
    </motion.div>
  );
};

export const Example = (props: Props) => {
  const y = useMotionValue(0);

  const [items, setItems] = useState(initialItems);
  const { top, bottom } = useConstraints(items);
  const controls = useAnimation();
  const totalScroll = getHeight(items);
  const scrollContainer = 150;

  const onDelete = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);

    const newScrollHeight = getHeight(newItems);
    const bottomOffset = -y.get() + scrollContainer;
    const bottomWillBeVisible = newScrollHeight < bottomOffset;
    const isScrollHeightLarger = newScrollHeight >= scrollContainer;

    if (bottomWillBeVisible && isScrollHeightLarger) {
      controls.start({
        y: -newScrollHeight + scrollContainer,
      });
    }

    setItems(newItems);
  };

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
      }}>
      <motion.div
        style={{ y, height: totalScroll }}
        drag="y"
        dragDirectionLock
        dragConstraints={{ top, bottom }}
        animate={controls}>
        {items.map((value, index) => (
          <Item total={items.length} index={index} onDelete={onDelete} key={value} />
        ))}
      </motion.div>
    </div>
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
