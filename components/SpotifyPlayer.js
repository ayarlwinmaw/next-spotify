'use client';

import { useEffect, useState } from 'react';

export default function SpotifyPlayer({ accessToken }) {
  const [player, setPlayer] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadSpotifySDK = () => {
      return new Promise((resolve, reject) => {
        if (window.Spotify) {
          resolve(window.Spotify);
        } else {
          const script = document.createElement('script');
          script.src = 'https://sdk.scdn.co/spotify-player.js';
          script.onload = () => resolve(window.Spotify);
          script.onerror = () => reject(new Error('Spotify SDK failed to load'));
          document.body.appendChild(script);
        }
      });
    };

    const initializeSpotifyPlayer = async () => {
      const Spotify = await loadSpotifySDK();

      const spotifyPlayer = new Spotify.Player({
        name: 'Vinyl AI Web Player',
        getOAuthToken: (cb) => { cb(accessToken); },
        volume: 0.5,
      });

      // Add listeners for player state and readiness
      spotifyPlayer.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        setIsReady(true);
      });

      spotifyPlayer.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      // Connect the player
      spotifyPlayer.connect().catch(err => console.error('Error connecting player:', err));
      setPlayer(spotifyPlayer);
    };

    initializeSpotifyPlayer();

    // Cleanup function to disconnect the player
    return () => {
      if (player) {
        player.disconnect();
      }
    };
  }, [accessToken, player]);

  return (
    <div>
      {isReady ? (
        <div>
          <h1>Spotify Web Player is Ready</h1>
          {/* You can add your player controls here */}
        </div>
      ) : (
        <div>Loading Spotify Web Player...</div>
      )}
    </div>
  );
}
