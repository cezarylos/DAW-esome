import { PreviewRef } from 'app/components/drag-layer/drag-layer.interface';
import { DragItemTypeEnum } from 'app/enums/drag-item-type.enum';
import { Dispatch, RefObject, useEffect, useRef } from 'react';

interface UseGetPreviewRefHookInterface {
  setRef: Dispatch<PreviewRef>;
  type: DragItemTypeEnum;
}

export const useGetPreviewRefHook = ({ setRef, type }: UseGetPreviewRefHookInterface): RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect((): void => {
    if (!ref.current) {
      return;
    }
    const previewRef = {
      element: ref.current,
      type
    }
    setRef(previewRef);
  }, [ref, setRef, type]);

  return ref;
}
