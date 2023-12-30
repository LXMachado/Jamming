import React, { useState, useCallback } from 'react';
import './App.css';
import Spotify from '../utils/Spotify';
import SearchResults from '../components/SearchResults/SearchResults';
import Playlist from '../components/Playlist/Playlist';
import SearchBar from '../components/SearchBar/SearchBar';

function App() {
  const [term, setTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [savedStatus, setSavedStatus] = useState('');

  const search = useCallback(async (newTerm) => {
    try {
      const results = await Spotify.search(newTerm);
      setSearchResults(results);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  }, []);

  const addTrack = useCallback((track) => {
    // playlistTracks
    const newPlaylistTracks = [...playlistTracks];

    if (!newPlaylistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      newPlaylistTracks.push(track);
      setPlaylistTracks(newPlaylistTracks);
    }
  }, [playlistTracks]);

  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }, []);

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);



  const savePlaylist = useCallback(async () => {
    try {
      const trackUris = playlistTracks.map((track) => track.uri);
      await Spotify.savePlaylist(playlistName, trackUris);
      setSavedStatus('Playlist by Alexandre Machado. The playlist was successfully saved.');
  
      setTimeout(() => {
        setSavedStatus('');
        setPlaylistName('New Playlist');
        setPlaylistTracks([]);
      }, 3000);
    } catch (error) {
      setSavedStatus(' Playlist was not saved. An error occurred.');
  
      setTimeout(() => {
        setSavedStatus('');
      }, 3000);
    }
  }, [playlistName, playlistTracks]);
  

  return (
    <div>
      <h1>Ja<span className="highlight">mm</span>ing</h1>
      <div className="App">
        <br></br>
        <SearchBar onSearch={search} term={term} setTerm={setTerm} />

        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onNameChange={updatePlaylistName}
            onRemove={removeTrack}
            onSave={savePlaylist}
            saveStatus={savedStatus}
          />
        </div>
      </div>
    </div>
  );
}

export default App;