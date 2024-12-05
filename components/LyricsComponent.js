// LyricsComponent.js
'use client'; // Ensure this file is treated as a client component

import { useEffect, useState } from 'react';

const LyricsComponent = ({ playingTrack }) => {
    const [lyrics, setLyrics] = useState('');

    const fetchLyrics = async () => {
        try {
            const response = await fetch(`/api/lyrics?artist=${encodeURIComponent(playingTrack.artistName)}&track=${encodeURIComponent(playingTrack.title)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch lyrics');
            }

            const data = await response.json();
            if (data.lyrics) {
                setLyrics(data.lyrics);
            } else {
                setLyrics('Lyrics not available.');
            }
        } catch (error) {
            console.error('Error fetching lyrics:', error);
            setLyrics('Failed to fetch lyrics.');
        }
    };

    useEffect(() => {
        fetchLyrics(); // Fetch lyrics when the component mounts
    }, [playingTrack]); // Run again if playingTrack changes

    return (
        <div>
            <h2>{playingTrack.title} Lyrics</h2>
            <pre className='text-pretty'>{lyrics}</pre>
        </div>
    );
};

export default LyricsComponent;
