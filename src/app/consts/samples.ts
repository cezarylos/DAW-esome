import randomColor from 'randomcolor';

const colorOptions = {
  luminosity: 'dark'
} as Record<string, string>;

export const samples = [
  { name: 'Bass', sourceUrl: 'samples/Bass.mp3', color: randomColor(colorOptions) },
  { name: 'Drums', sourceUrl: 'samples/Drums.mp3', color: randomColor(colorOptions) },
  { name: 'Guitar', sourceUrl: 'samples/Guitar.mp3', color: randomColor(colorOptions) },
  { name: 'Hammond', sourceUrl: 'samples/Hammond.mp3', color: randomColor(colorOptions) },
  { name: 'Vocals', sourceUrl: 'samples/Vocals.mp3', color: randomColor(colorOptions) }
];
