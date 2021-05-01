import React from 'react';
import { AudioContext, IAudioContext } from 'standardized-audio-context';

export const AppAudioContext = React.createContext<IAudioContext>(new AudioContext());
