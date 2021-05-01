import { SavedTrackInterface } from 'app/components/saved-track/saved-track.interface';
import { StorageKeysEnum } from 'app/enums/storage-keys.enum';

export class StorageService {
  private static myInstance: StorageService | null = null;

  public static getInstance(): StorageService {
    if (StorageService.myInstance === null) {
      StorageService.myInstance = new StorageService();
    }
    return this.myInstance as StorageService;
  }

  private static store(key: StorageKeysEnum, value: string): void {
    localStorage.setItem(key, value);
  }

  private static get(key: StorageKeysEnum): string | null {
    return localStorage.getItem(key);
  }

  public getTracks(): SavedTrackInterface[] | void {
    try {
      const tracksJson = JSON.parse(StorageService.get(StorageKeysEnum.TRACKS) || '{}');
      return Object.values(tracksJson) || ([] as SavedTrackInterface[]);
    } catch (e) {
      console.error(e);
    }
  }

  public saveTrack(track: SavedTrackInterface): void {
    try {
      const tracks = JSON.parse(StorageService.get(StorageKeysEnum.TRACKS) || '{}');
      const updatedTracks = JSON.stringify({ ...tracks, [track.id]: track });
      StorageService.store(StorageKeysEnum.TRACKS, updatedTracks);
    } catch (e) {
      console.error(e);
    }
  }
}
