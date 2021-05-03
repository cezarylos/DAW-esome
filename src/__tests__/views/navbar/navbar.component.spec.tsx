import { mount } from 'enzyme';
import React from 'react';

import Navbar from 'app/views/navbar/navbar.component';

describe('nabvar', (): void => {
  it('navbar should contain certain header text', (): void => {
    const textToCheck = 'DAWesome';
    const component = mount(<Navbar />);
    const h5 = component.find('h5');
    expect(h5.text()).toEqual(textToCheck);
  });
});
