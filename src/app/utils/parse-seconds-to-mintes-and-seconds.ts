export const parseSecondsToMinutesAndSeconds = (seconds: number, detailed?: boolean): string => {
  const m = Math.floor(seconds / 60);
  let s = (seconds - m * 60)
    .toFixed(detailed ? 2 : 0)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
};
