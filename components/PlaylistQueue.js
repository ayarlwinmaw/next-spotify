import { useState, useEffect } from 'react';

const PlaylistQueue = ({ accessToken, playingTrack }) => {
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [queueTracks, setQueueTracks] = useState([]);

    // Fetch recently played playlist when the component mounts
    useEffect(() => {
        if (!accessToken) return;

        const fetchRecentPlaylist = async () => {
            try {
                const response = await fetch('https://api.spotify.com/v1/me/player/recently-played', {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                if (!response.ok) throw new Error('Failed to fetch recently played playlist.');

                const data = await response.json();
                const recentTracks = data.items.map(item => item.track);
                setPlaylistTracks(recentTracks);
            } catch (error) {
                console.error('Error fetching recent playlist:', error);
            }
        };

        fetchRecentPlaylist();
    }, [accessToken]);

    // Fetch recommendations or similar playlist when the playingTrack changes
    useEffect(() => {
        if (!accessToken || !playingTrack) return;

        const fetchRecommendations = async () => {
            try {
                const response = await fetch(
                    `https://api.spotify.com/v1/recommendations?seed_artists=${playingTrack.artistId}&seed_tracks=${playingTrack.uri}`,
                    {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    }
                );

                if (!response.ok) throw new Error('Failed to fetch recommendations.');

                const data = await response.json();
                setPlaylistTracks(data.tracks);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            }
        };

        fetchRecommendations();
    }, [accessToken, playingTrack]);

    return (
        <div className="flex flex-col bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-bold mb-4">Current Playlist</h2>
            <ul className="mb-4">
                {playlistTracks.map(track => (
                    <li key={track.id} className="text-sm mb-2">
                        {track.name} by {track.artists.map(artist => artist.name).join(', ')}
                    </li>
                ))}
            </ul>
            <h2 className="text-lg font-bold mb-4">Queue</h2>
            <ul>
                {queueTracks.map(track => (
                    <li key={track.id} className="text-sm mb-2">
                        {track.name} by {track.artists.map(artist => artist.name).join(', ')}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlaylistQueue;
