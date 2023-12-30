import React, { useState, useCallback } from "react";

import "./Playlist.css";

import TrackList from "../TrackList/TrackList";

const Playlist = ({ onNameChange, saveStatus, ...restProps }) => {
  const [saved, setSaved] = useState(false);

  const handleNameChange = useCallback(
    ({ target: { value } }) => {
      onNameChange(value);
    },
    [onNameChange]
  );

  return (
    <div className="Playlist">
      <input onChange={handleNameChange} defaultValue={"New Playlist"} />
      <TrackList
        tracks={restProps.playlistTracks}
        isRemoval={true}
        onRemove={restProps.onRemove}
      />
      <button className="Submit" onClick={async () => {
        await restProps.onSave();
        setSaved(true);
      }}>
        SAVE TO SPOTIFY
      </button>
      {saved && <p className="SaveStatus">{saveStatus}</p>}
    </div>
  );
};

export default Playlist;