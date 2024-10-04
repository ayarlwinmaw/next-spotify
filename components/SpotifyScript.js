// components/SpotifyScript.js
'use client';

import Script from 'next/script';

export default function SpotifyScript() {
  return (
    <Script 
      src="https://sdk.scdn.co/spotify-player.js" 
      strategy="beforeInteractive"
      onLoad={() => {
        console.log('Spotify SDK loaded');
      }}
    />
  );
}
