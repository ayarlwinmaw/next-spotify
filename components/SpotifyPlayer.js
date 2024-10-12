'use client';

import { useEffect, useState } from 'react';

export default function SpotifyPlayer({ accessToken }) {
  const [player, setPlayer] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    const loadSpotifySDK = () => {
      return new Promise((resolve, reject) => {
        if (window.Spotify) {
          console.log('Spotify SDK already loaded.');
          resolve(window.Spotify);
        } else {
          console.log('Loading Spotify SDK...');
          const script = document.createElement('script');
          script.src = 'https://sdk.scdn.co/spotify-player.js';
          script.async = true;
          script.onload = () => {
            console.log('Spotify SDK loaded successfully.');
            window.onSpotifyWebPlaybackSDKReady = () => {
              resolve(window.Spotify);
            };
          };
          script.onerror = (error) => {
            console.error('Error loading Spotify SDK:', error);
            reject(new Error('Spotify SDK failed to load'));
          };
          document.body.appendChild(script);
        }
      });
    };

    const initializeSpotifyPlayer = async () => {
      try {
        const Spotify = await loadSpotifySDK();

        if (Spotify && Spotify.Player) {
          const spotifyPlayer = new Spotify.Player({
            name: 'Next.js Spotify Web Player',
            getOAuthToken: (cb) => { cb(accessToken); },
            volume: 0.5,
          });

          spotifyPlayer.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
            setDeviceId(device_id);
            setIsReady(true);
          });

          spotifyPlayer.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
          });

          // Connect the player
          spotifyPlayer.connect().catch(err => console.error('Error connecting player:', err));
          setPlayer(spotifyPlayer);
        } else {
          console.error('Spotify Player is not available.');
        }
      } catch (error) {
        console.error('Failed to initialize Spotify Player:', error);
      }
    };

    initializeSpotifyPlayer();

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
          <h1>Spotify Player Ready with Device ID: {deviceId}</h1>
          {/* Add your player controls here */}
        </div>
      ) : (
        <div>Loading Spotify Web Player...</div>
      )}
    </div>
  );
}
