import { NextResponse } from 'next/server';
import SpotifyWebApi from 'spotify-web-api-node';

// Initialize Spotify API with your credentials
const spotifyApi = new SpotifyWebApi({
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

// Step 1: Generate the authorization URL with scopes (this part is typically run in your authentication route)
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    console.error('No code provided');
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  console.log('Authorization code:', code); // Log the received code

  try {
    // Define the required scopes for your Spotify API interactions
    const scopes = [
      'user-read-recently-played',    // Read the recently played songs
      'user-read-playback-state',     // Read the playback state
      'user-modify-playback-state',   // Control playback state (e.g., play/pause)
      'playlist-read-private',        // Read private playlists
      'playlist-read-collaborative',  // Read collaborative playlists
    ];

    // Ensure that `scopes` is an array before calling `.join()`
    const scopeString = Array.isArray(scopes) ? scopes.join(' ') : scopes;

    // Ensure you are passing the scopes when generating the authorization URL
    const authorizeUrl = spotifyApi.createAuthorizeURL(scopeString, { show_dialog: true });

    // If no code is present, redirect the user to the authorization URL
    if (!code) {
      return NextResponse.redirect(authorizeUrl);
    }

    // Step 2: Exchange the authorization code for an access token and refresh token
    const data = await spotifyApi.authorizationCodeGrant(code);

    // Extract tokens and scope from the response
    const { access_token, refresh_token, scope } = data.body;

    console.log('Access token:', access_token);  // Log the access token
    console.log('Refresh token:', refresh_token); // Log the refresh token
    console.log('Scopes granted:', scope); // Log the scopes granted

    // Construct the absolute URL for redirection
    const redirectUrl = new URL('/', request.url).origin + `?access_token=${access_token}`;

    // Redirect to the home page with the access token
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Error retrieving access token:', error.message); // Log detailed error
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
