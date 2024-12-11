import React, { useEffect, useState } from "react";

export default function LyricsComponent({ track }) {
    const [lyrics, setLyrics] = useState([]);
    const [activeLineIndex, setActiveLineIndex] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);  // Track the current time internally
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to fetch lyrics based on the track information
    const fetchLyrics = async () => {
        if (!track) return;

        const { artistName, title } = track;

        setLoading(true);
        setError(null); // Reset error state before fetching

        try {
            const response = await fetch(`/api/lyrics?artist=${encodeURIComponent(artistName)}&track=${encodeURIComponent(title)}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch lyrics');
            }

            const data = await response.json();
            setLyrics(data);  // Assuming the response is an array of lyric objects
        } catch (error) {
            console.error('Error fetching lyrics:', error);
            setError('Failed to fetch lyrics'); // Update error state
        } finally {
            setLoading(false); // Set loading to false once the fetch completes
        }
    };

    // Sync the active line based on the current time
    useEffect(() => {
        if (!lyrics || lyrics.length === 0) return;

        // Find the index of the lyric based on currentTime
        const activeIndex = lyrics.findIndex((lyric, index) => {
            // Allow a small window of 0.5 seconds before and after the lyric's time
            return (
                currentTime >= lyric.seconds - 0.05 &&
                currentTime < lyric.seconds + 0.05
            );
        });

        // Update the active line if we found a valid index
        if (activeIndex !== -1) {
            setActiveLineIndex(activeIndex);
        }
    }, [currentTime, lyrics]);  // Re-run when currentTime or lyrics change

    // Create a custom timer to simulate the passage of time
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime((prevTime) => prevTime + 0.1); // Increase time every 100ms (0.1s)
        }, 100); // Update every 100ms

        return () => clearInterval(timer);  // Cleanup timer on component unmount
    }, []);

    // Fetch lyrics when the track changes
    useEffect(() => {
        fetchLyrics();
    }, [track]);

    // Handle loading and error states
    if (loading) {
        return <div className="lyrics-container text-gray-500">Loading lyrics...</div>;
    }

    if (error) {
        return <div className="lyrics-container text-red-500">{error}</div>;
    }

    // Render nothing if lyrics are not valid or empty
    if (!lyrics || lyrics.length === 0) {
        return <div className="lyrics-container text-gray-500">No lyrics available.</div>;
    }

    return (
        <div className="lyrics-container overflow-y-auto h-full p-4 text-left">
            {lyrics.map((lyric, index) => (
                <p
                    key={`${lyric.seconds}-${index}`}  // Use seconds combined with index to ensure unique keys
                    className={`lyric-line ${index === activeLineIndex ? 'text-green-500 font-bold' : 'text-gray-700'}`}
                >
                    {lyric.lyrics}
                </p>
            ))}
        </div>
    );
}
