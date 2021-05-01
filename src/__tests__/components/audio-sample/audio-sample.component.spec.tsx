import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

import AudioSample from 'app/components/audio-sample/audio-sample.component';
import { samples } from 'app/consts/samples';
import * as Utils from 'app/utils/load-audio-buffer.util';
import {AudioContext} from 'standardized-audio-context-mock';

const mockedSample = samples[0];

describe('audio-sample', (): void => {
  it('should render AudioSample component and loadAudioBuffer', async (): Promise<void> => {
    let component = null;
    const context = new AudioContext();
    const spy = jest.spyOn(Utils as any, 'loadAudioBufferUtil');
    const { name, sourceUrl } = mockedSample;
    await act(
        async (): Promise<void> => {
          component = mount(<AudioSample name={name} sourceUrl={sourceUrl} />);
        }
    );
    expect(spy).toHaveBeenCalledWith({ sourceUrl, context });
    expect(component).toBeTruthy();
  });
})
