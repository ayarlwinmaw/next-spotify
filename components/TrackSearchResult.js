import React from "react";

export default function TrackSearchResult( {track, chooseTrack}){
    function handlePlay(){
        chooseTrack(track)
    }
    return (
        <div  className="flex items-center m-2 cursor-pointer border border-transparent group hover:border-rose-500/50 hover:shadow-inner shadow-rose-300 transition duration-300 ease-in-out" 
        onClick={handlePlay}
        >
            <img 
                src={track.albumUrl} 
                alt={track.title} 
                className="h-16 w-16 flex-shrink-0" // Fixed size for the image
            />
            <div className="ml-4 flex-grow"> {/* Pushes the content to take the rest of the space */}
                <div className="font-medium text-rose-700">{track.title}</div>
                <div className="text-red-500">{track.artistName}</div>
            </div>
        </div>
    )
}