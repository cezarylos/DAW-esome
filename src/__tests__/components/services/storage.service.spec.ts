import { v4 } from 'uuid';

import { StorageKeysEnum } from 'app/enums/storage-keys.enum';
import { StorageService } from 'app/services/storage.service';

const service = StorageService.getInstance();
const id = v4();
const mockedTracks = [
  {
    name: 'mocked track',
    samples: [
      {
        sourceUrl: 'mocked_url',
        start: 0,
        id: v4()
      }
    ],
    id
  },
  {
    name: 'set mocked track',
    samples: [
      {
        sourceUrl: 'set_mocked_url',
        start: 0,
        id: v4()
      }
    ],
    id
  }
];

const mockedStorage = {
  [StorageKeysEnum.TRACKS]: JSON.stringify({ [id]: mockedTracks[0] })
};

describe('storage service', (): void => {
  it('should test getting track from localStorage and parsing them', (): void => {
    Storage.prototype.getItem = jest.fn((key: StorageKeysEnum): string => mockedStorage[key]);
    const tracks = service.getTracks();
    expect(tracks).toEqual([mockedTracks[0]]);
  });

  it('should test setting track to localStorage', (): void => {
    Storage.prototype.setItem = jest.fn((key: StorageKeysEnum, value: string): void => {
      mockedStorage[key] = value;
    });
    service.saveTrack(mockedTracks[1]);
    const storageValue = mockedStorage[StorageKeysEnum.TRACKS];
    const value = JSON.stringify({
      [mockedTracks[0].id]: mockedTracks[0],
      [mockedTracks[1].id]: mockedTracks[1]
    });
    expect(storageValue).toEqual(value);
  });
});
