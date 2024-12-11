'use client';

import { useState, useEffect } from 'react';

const SpotifyPlayer = ({ accessToken, trackUri }) => {
    const [player, setPlayer] = useState(null);
    const [isPaused, setIsPaused] = useState(true);
    const [currentTrack, setCurrentTrack] = useState(null);

    useEffect(() => {
        if (!accessToken) return;

        // Load Spotify Web Playback SDK
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;
        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => cb(accessToken),
                volume: 0.5,
            });

            setPlayer(player);

            // Connect to the player
            player.connect();

            // Player State Handling
            player.addListener('player_state_changed', state => {
                if (!state) return;
                setCurrentTrack(state.track_window.current_track);
                setIsPaused(state.paused);
            });

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID:', device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline:', device_id);
            });
        };

        return () => {
            if (player) player.disconnect();
            script.remove();
        };
    }, [accessToken]);

    useEffect(() => {
        if (!trackUri || !player) return;

        // Play a track
        fetch(`https://api.spotify.com/v1/me/player/play`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [trackUri] }),
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        }).catch(err => console.error('Error playing track:', err));
    }, [trackUri, player, accessToken]);

    if (!player) return <div>Loading Spotify Player...</div>;

    return (
        <div className="spotify-player">
            <div>Currently Playing: {currentTrack?.name || 'None'}</div>
            <button onClick={() => player.togglePlay()}>
                {isPaused ? 'Play' : 'Pause'}
            </button>
        </div>
    );
};

export default SpotifyPlayer;
