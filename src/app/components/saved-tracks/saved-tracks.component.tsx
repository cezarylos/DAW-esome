import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import SavedTrack from 'app/components/saved-track/saved-track.component';
import styles from 'app/components/saved-tracks/saved-tracks.module.scss';
import { selectSavedTracks } from 'app/store/slices/tracks.slice';

const SavedTracks = (): ReactElement => {
  const savedTracks = useSelector(selectSavedTracks);

  console.log(savedTracks);

  return (
    <div className={styles.container}>
      <span className={styles.title}>Saved Tracks</span>
      {savedTracks.length ? (
        <>
          {savedTracks.map(({ name, id, samples }) => (
            <SavedTrack key={id} name={name} samples={samples} />
          ))}
        </>
      ) : (
        <span className={styles.noTracks}>You didn’t save any tracks, yet.</span>
      )}
    </div>
  );
};

export default SavedTracks;
