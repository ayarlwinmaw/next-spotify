import { NextResponse } from 'next/server';
import SpotifyWebApi from 'spotify-web-api-node';

// const scopes = ['user-read-private', 'user-read-email', 'streaming', 'user-modify-playback-state', 'user-read-playback-state'];
const scopes = [
  'user-read-private',
  'user-read-email',
  'streaming',
  'playlist-read-private',
  'playlist-modify-public',
  'playlist-modify-private',
  'user-library-read',
  'user-library-modify',
  'app-remote-control',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-recently-played',
   // Added required scope
];

const spotifyApi = new SpotifyWebApi({
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

export async function GET() {
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes);
  
  // Redirect the user to Spotify's login page
  return NextResponse.redirect(authorizeURL);
}
