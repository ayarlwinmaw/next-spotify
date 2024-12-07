import React from 'react';

// PlaylistQueue displays a list of tracks (either recently played or recommended)
export default function PlaylistQueue({ tracks = [] }) {
    return (
        <div>
            {tracks.map((track, index) => (
                <div key={track.uri} className="flex items-center p-2 border-b">
                    <img src={track.album.images[0].url} alt={track.name} className="w-12 h-12 mr-4" />
                    <div className="flex flex-col">
                        <span className="font-semibold">{track.name}</span>
                        <span className="text-sm text-gray-500">{track.artists.map(artist => artist.name).join(', ')}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
