export const parseSecondsToMinutesAndSeconds = (seconds: number, detailed?: boolean): string => {
  const m = Math.floor(seconds / 60);
  const secondsRoundedDown = Math.floor((seconds - m * 60) * 100) / 100;
  const s = (detailed ? secondsRoundedDown : Math.floor(secondsRoundedDown)).toString().padStart(2, '0');
  return `${m}:${s}`;
};
