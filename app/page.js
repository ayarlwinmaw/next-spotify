'use client';

import { useEffect, useState } from 'react';
import SpotifyPlayer from '../components/SpotifyPlayer'; // Import the Spotify Player component
import { useRouter } from 'next/navigation';

export default function Home() {
  const [accessToken, setAccessToken] = useState(null);
  const router = useRouter();

  // Check for access token in the URL (e.g., after redirect from Spotify login)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('access_token');
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const handleLogin = () => {
    router.push('/api/login'); // Redirect to Spotify login via API
  };

  return (
    <div>
      {accessToken ? (
        <SpotifyPlayer accessToken={accessToken} /> // Show the player if the user is authenticated
      ) : (
        <div>
          <h1>Login to Spotify</h1>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}
