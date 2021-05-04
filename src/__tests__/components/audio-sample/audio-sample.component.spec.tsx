import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { AudioContext } from 'standardized-audio-context-mock';

import AudioSample from 'app/components/audio-sample/audio-sample.component';
import { samples } from 'app/consts/samples';
import * as Utils from 'app/utils/load-audio-buffer.util';

let component: ReactWrapper = (null as unknown) as ReactWrapper;
const mockedSample = samples[0];
const context = new AudioContext();
const { name, sourceUrl } = mockedSample;
const spy = jest.spyOn(Utils as any, 'loadAudioBufferUtil');

describe('audio-sample', (): void => {
  beforeEach(
    async (): Promise<void> => {
      await act(
        async (): Promise<void> => {
          component = await mount(<AudioSample name={name} sourceUrl={sourceUrl} color={'#FFFFFF'} />);
        }
      );
    }
  );

  it('should render AudioSample component and call loadAudioBuffer', async (): Promise<void> => {
    expect(spy).toHaveBeenCalledWith({ sourceUrl, context });
  });

  it('should instantiate Player Instance and render PlayButton component', async (): Promise<void> => {
    component?.update();
    expect(component?.find('PlayButton')).toHaveLength(1);
  });
});
