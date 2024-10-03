// components/SpotifyPlayer.js
'use client'

import { signIn } from 'next-auth/react';
import PlayerComponent from './PlayerComponent';

const SpotifyPlayer = ({ session }) => {
  if (!session) {
    return <button onClick={() => signIn('spotify')}>Log in with Spotify</button>;
  }

  return <PlayerComponent />;
};

export default SpotifyPlayer;
