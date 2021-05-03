const TIMELINE_SCALE = 50; // in px (px * 1/s) - set it to minimum 30px for good visibility
const DURATION = 5 * 60; // in seconds

export const config = {
  timelineScale: TIMELINE_SCALE,
  duration: DURATION,
  width: TIMELINE_SCALE * DURATION
};
