import { RefObject, useEffect, useRef } from 'react';

import { UseGetPreviewRefHookInterface } from 'app/interfaces';

export const useGetPreviewRefHook = ({
  setRef,
  type
}: UseGetPreviewRefHookInterface): RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect((): void => {
    if (!ref.current) {
      return;
    }
    const previewRef = {
      element: ref.current,
      type
    };
    setRef(previewRef);
  }, [ref, setRef, type]);

  return ref;
};
