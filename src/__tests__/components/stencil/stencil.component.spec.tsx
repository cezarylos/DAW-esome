import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

import Stencil from 'app/components/stencil/stencil.component';
import { samples } from 'app/consts/samples';

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
