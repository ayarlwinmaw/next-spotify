'use client';

import { useEffect, useState } from 'react';

export default function SpotifyPlayer({ accessToken }) {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const initializeSpotifyPlayer = () => {
      if (window.Spotify) {
        const spotifyPlayer = new window.Spotify.Player({
          name: 'Vinyl AI Web Player',
          getOAuthToken: cb => { cb(accessToken); },
          volume: 0.5,
        });

        // Add listeners to handle the player state and readiness
        spotifyPlayer.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
        });

        spotifyPlayer.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });

        spotifyPlayer.addListener('player_state_changed', (state) => {
          console.log('Player state changed:', state);
        });

        spotifyPlayer.connect();
        setPlayer(spotifyPlayer);
      } else {
        console.error('Spotify SDK not available.');
      }
    };

    // Ensure the SDK has loaded before attempting to use it
    if (window.Spotify) {
      initializeSpotifyPlayer();
    } else {
      // Set a check to initialize after the SDK loads
      const scriptLoadCheck = setInterval(() => {
        if (window.Spotify) {
          initializeSpotifyPlayer();
          clearInterval(scriptLoadCheck); // Stop checking once the SDK has loaded
        }
      }, 100);
    }

    // Cleanup the player on component unmount
    return () => {
      if (player) {
        player.disconnect();
      }
    };
  }, [accessToken, player]);

  return (
    <div>
      {player ? (
        <div>Spotify Web Player is Ready</div>
      ) : (
        <div>Loading Spotify Web Player...</div>
      )}
    </div>
  );
}
