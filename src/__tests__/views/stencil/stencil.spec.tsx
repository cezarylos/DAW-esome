import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

import { samples } from 'app/consts/samples';
import Stencil from 'app/views/stencil/stencil';

describe('stencil', (): void => {
  it('should render AudioSample components', async (): Promise<void> => {
    const samplesCount = samples.length;
    let audioSampleComponents: ReactWrapper = (null as unknown) as ReactWrapper;
    await act(
      async (): Promise<void> => {
        const component = await mount(<Stencil />);
        audioSampleComponents = component.find('AudioSample');
      }
    );
    expect(audioSampleComponents).toHaveLength(samplesCount);
  });
});
