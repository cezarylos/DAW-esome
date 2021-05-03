export const parseSecondsToMinutesAndSeconds = (seconds: number, padStart?: boolean): string => {
  const m = Math.floor(seconds / 60);
  let s = (seconds - m * 60).toFixed(0).toString();
  if (padStart) {
    s = s.padStart(2, '0');
  }
  return `${m}:${s}`;
};
