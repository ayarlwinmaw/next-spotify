'use client';

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
            
            <div className="text-pretty leading-normal">
    {lyrics
        ? lyrics.split('\n').map((line, index) =>
              line.trim() === '' ? ( // Check if the line is empty
                  <br key={index} />
              ) : (
                  <p key={index} className="mb-1">
                      {line}
                  </p>
              )
          )
        : 'Loading lyrics...'}
</div>

        </div>
    );
};

export default LyricsComponent;
