
const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI

const AUTH_URL = `https://accounts.spotify.com/authorize?
client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&
scope=streaming%20user-read-email%20user-read-private%20user-library-read%20
user-library-modify%20user-read-playback-state%20user-modify-playback-state`

export default function Login(){
    return(

            <a class="btn btn-success btn-lg" href={AUTH_URL}>Log in with Spotify</a>

    ) 
}