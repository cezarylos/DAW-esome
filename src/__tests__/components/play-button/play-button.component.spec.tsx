import { mount, ReactWrapper } from 'enzyme';
import React from 'react';

import PlayButton from 'app/components/play-button/play-button.component';

let component: ReactWrapper = (null as unknown) as ReactWrapper;

describe('play-button', (): void => {
  it('should trigger onClick function on component click', (): void => {
    const onClickMock = jest.fn();
    component = mount(<PlayButton onClick={onClickMock} />);
    const element = component.find('div');
    element.simulate('click');
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
