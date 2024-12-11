import React, { useState } from 'react';
import SpotifyWebPlayback from 'react-spotify-web-playback';

export default function Player({ accessToken, trackUri, onProgressUpdate }) {
    const [progressMs, setProgressMs] = useState(0);

    const handleCallback = (state) => {
        if (!state.isPlaying) return;
        setProgressMs(state.progressMs);
        onProgressUpdate(state.progressMs); // Pass progressMs to the parent component
    };

    if (!accessToken) return null;

    return (
        <SpotifyWebPlayback
            token={accessToken}
            uris={trackUri ? [trackUri] : []}
            callback={handleCallback}
            play={true}
            styles={{
                activeColor: '#fff',
                bgColor: '#333',
                color: '#fff',
                loaderColor: '#fff',
                sliderColor: '#1cb954',
                trackArtistColor: '#ccc',
                trackNameColor: '#fff',
            }}
        />
    );
}
