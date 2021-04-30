import { UseGetPreviewRefHookInterface } from 'app/interfaces';
import { RefObject, useEffect, useRef } from 'react';

export const useGetPreviewRefHook = ({ setRef, type }: UseGetPreviewRefHookInterface): RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement | null>(null);

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
