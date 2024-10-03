// components/PlayerComponent.js
'use client'

import { useEffect } from 'react';

const PlayerComponent = () => {
  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new Spotify.Player({
        name: 'Your App Name',
        getOAuthToken: async (cb) => {
          const accessToken = '...'; // Fetch access token from your authentication system
          cb(accessToken);
        },
        volume: 0.5,
      });

      // Connect to the Spotify player
      player.connect().then((success) => {
        if (success) {
          console.log('The Web Playback SDK successfully connected to Spotify!');
        }
      });
    };
  }, []);

  return <div id="spotify-player"></div>;
};

export default PlayerComponent;
