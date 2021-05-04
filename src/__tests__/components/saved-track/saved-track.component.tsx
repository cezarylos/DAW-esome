import { mount, ReactWrapper } from 'enzyme';
import React, { ReactElement, ReactNode } from 'react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { v4 } from 'uuid';

import SavedTrack from 'app/components/saved-track/saved-track.component';
import { samples } from 'app/consts/samples';
import * as Actions from 'app/store/actions/tracks.actions';

const { sourceUrl } = samples[0];

const mockedSamples = [
  {
    sourceUrl,
    start: 0,
    id: v4()
  }
];

const mockedTracks = [
  {
    name: 'test',
    samples: mockedSamples,
    id: v4()
  }
];

let component: ReactWrapper;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  tracks: {
    savedTracks: mockedTracks
  }
});
const Wrapper = ({ children }: { children: ReactNode }): ReactElement => <Provider store={store}>{children}</Provider>;

describe('Saved Track Component', (): void => {
  it('should remove saved track from store', async (): Promise<void> => {
    const spy = jest.spyOn(Actions, 'removeSavedTrack');
    await act(
      async (): Promise<void> => {
        component = mount(
          <Wrapper>
            <SavedTrack name={mockedTracks[0].name} samples={mockedTracks[0].samples} id={mockedTracks[0].id} />
          </Wrapper>
        );
      }
    );
    const removeButton = component.find('RemoveButton');
    await removeButton.simulate('click');
    expect(spy).toHaveBeenCalledWith(mockedTracks[0].id);
  });
});
