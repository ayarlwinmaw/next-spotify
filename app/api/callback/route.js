import { NextResponse } from 'next/server';
import SpotifyWebApi from 'spotify-web-api-node';

// Initialize Spotify API with your credentials
const spotifyApi = new SpotifyWebApi({
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    console.error('No code provided');
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  console.log('Authorization code:', code); // Log the received code

  try {
    // Exchange the code for an access token
    const data = await spotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token } = data.body;

    // Construct the absolute URL for redirection
    const redirectUrl = new URL('/', request.url).origin + `?access_token=${access_token}`;

    // Redirect to home with the access token
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Error retrieving access token:', error.message); // Log detailed error
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
