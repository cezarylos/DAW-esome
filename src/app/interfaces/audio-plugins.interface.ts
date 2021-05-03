import { IAudioContext, IGainNode } from 'standardized-audio-context';

export interface AudioPluginsInterface {
  gain: IGainNode<IAudioContext>;
}
