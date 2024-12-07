import { useEffect } from 'react';
import { generateSpotifyAuthUrl } from '../app/api/callback/route';
export default function AuthRedirect() {
  useEffect(() => {
    window.location.href = generateSpotifyAuthUrl(); // Redirect to Spotify authorization
  }, []);

  return <div>Redirecting to Spotify...</div>;
}
