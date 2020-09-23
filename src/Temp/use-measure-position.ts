import { useEffect, useRef } from 'react';

import { Position } from './use-position-reorder';

export const useMeasurePosition = (update: (arg: Position) => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    update({ height: ref.current?.offsetHeight || 0, top: ref.current?.offsetTop || 0 });
  });

  return ref;
};
