import { NextResponse } from 'next/server';
import SpotifyWebApi from 'spotify-web-api-node';

const scopes = ['user-read-private', 'user-read-email', 'streaming', 'user-modify-playback-state', 'user-read-playback-state'];

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
