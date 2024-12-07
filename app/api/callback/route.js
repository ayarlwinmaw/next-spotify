import { NextResponse } from 'next/server';
import SpotifyWebApi from 'spotify-web-api-node';

// Initialize Spotify API with your credentials
const spotifyApi = new SpotifyWebApi({
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

// Define the scopes you need
const scopes = [
  'user-read-private', // Read private data
  'user-read-email', // Read email
  'playlist-read-private', // Read playlists
  'playlist-modify-public', // Modify public playlists
  'playlist-modify-private', // Modify private playlists
  'user-library-read', // Read user library
  'user-library-modify', // Modify user library
  'app-remote-control', // Remote control app
  'user-read-playback-state', // Read playback state
  'user-modify-playback-state', // Modify playback state
  // Add more scopes as needed
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    console.error('No code provided');
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  console.log('Authorization code:', code); // Log the received code

  try {
    // Set the scopes before exchanging the code for an access token
    spotifyApi.setAccessToken('');
    spotifyApi.setRefreshToken('');

    // Exchange the code for an access token
    const data = await spotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token } = data.body;

    // Set the tokens in the SpotifyWebApi instance
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    // Construct the absolute URL for redirection
    const redirectUrl = new URL('/', request.url).origin + `?access_token=${access_token}`;

    // Redirect to home with the access token
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Error retrieving access token:', error.message); // Log detailed error
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}

// Generate the Spotify Authorization URL with scopes
export function generateSpotifyAuthUrl() {
  return spotifyApi.createAuthorizeURL(scopes, null); // Optional: add a state parameter for additional security
}
