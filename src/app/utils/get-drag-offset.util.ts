import { DRAG_OFFSET } from 'app/consts/drag-offset';
import { DragItemTypeEnum } from 'app/enums/drag-item-type.enum';

export const getDragOffset = (type: DragItemTypeEnum): number =>
  type === DragItemTypeEnum.AUDIO_SAMPLE ? DRAG_OFFSET : 0;
