import { useState, useEffect } from 'react';
import Player from './Player';
import TrackSearchResult from './TrackSearchResult';
import Slider from './Slider';
import { getGenres } from './genreSearch';
import LyricsComponent from './LyricsComponent'; // Import LyricsComponent
import SpotifyWebApi from 'spotify-web-api-node';
import Link from 'next/link';

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
});

export default function Dashboard({ accessToken }) {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState(null);
    const [genres, setGenres] = useState([]);
    const [progressMs, setProgressMs] = useState(0);

    const handleProgressUpdate = (currentProgress) => {
        setProgressMs(currentProgress); // Update progressMs
    };

    function chooseTrack(track) {
        setPlayingTrack(track);
        setSearch('');
    }

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        if (!search) return setSearchResults([]);
        if (!accessToken) return;
        let cancel = false;
        spotifyApi.searchTracks(search).then((res) => {
            if (cancel) return;
            setSearchResults(
                res.body.tracks.items.map((track) => {
                    const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
                        if (image.height < smallest.height) return image;
                        return smallest;
                    }, track.album.images[0]);

                    return {
                        artistName: track.artists[0].name,
                        artistId: track.artists[0].id,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url,
                        durationMs: track.duration_ms, // Include duration
                    };
                })
            );
        });

        return () => (cancel = true);
    }, [search, accessToken]);

     // Fetch genre information for the current playing track
     useEffect(() => {
        if (!playingTrack) return;

        handleSearch(playingTrack.artistName, playingTrack.title);
    }, [playingTrack]);

    const handleSearch = async (artist, track) => {
        const result = await getGenres(artist, track);
        setGenres(result);
    };

    return (
        <div className="flex flex-col py-2 h-screen">
            <input
                type="search"
                placeholder="Search Songs/Artists"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="absolute top-0 w-full border border-rose-300 rounded p-2 text-rose-500 caret-rose focus:border-rose-700"
            />

            {search && (
                <div className="z-60 backdrop-blur-sm absolute top-10 w-full overflow-y-auto h-lvh px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
                    {searchResults.map((track) => (
                        <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack} />
                    ))}
                </div>
            )}

            {playingTrack && (
                <div className='-z-20 relative w-full h-[calc(100%-60px)] overflow-hidden'>
                    <Slider genres={genres} />
                </div>
            )}
            <div className="absolute left-0 right-0 bottom-0">
                <Player
                    accessToken={accessToken}
                    trackUri={playingTrack?.uri}
                    onProgressUpdate={handleProgressUpdate} // Pass the handler
                />
            </div>

            {playingTrack && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                    <div className="w-[400px] h-[600px] backdrop-blur-sm bg-white/60 overflow-y-auto text-green-500 rounded-xl p-10">
                    <LyricsComponent track={playingTrack} />{/* Pass playingTrack */}
                    </div>
                </div>
            )}

            <Link href="/about">
                    <div className="fixed bottom-24 right-5 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-green-500 transition-all">
                    <i className="fas fa-info-circle text-2xl"></i>
                    </div>
            </Link>
        </div>
        
    );
}
