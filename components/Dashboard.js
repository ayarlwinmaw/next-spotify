import { useState, useEffect} from 'react';
import Player from './Player';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResult from './TrackSearchResult';


const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID
})

export default function Dashboard({accessToken}) {
    // const accessToke
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();
    const [lyrics, setLyrics] = useState("");

    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch('')
        setLyrics('')
    }
    // console.log(playingTrack.title)
    // console.log(playingTrack.artistName)
    // useEffect(()=>{
    //     if(!playingTrack) return
    //     axios.get('http://localhost:3001/lyrics',{
    //         params:{
    //             track: playingTrack.title,
    //             // artist: playingTrack.artistName
    //             artistName: playingTrack.artistName
    //         }
    //     }).then(res=>{
    //         setLyrics(res.data.lyrics)
    //     })
    // },[playingTrack])

    useEffect(() => {
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if(!search) return setSearchResults([])
        if(!accessToken) return 
        let cancel = false
        spotifyApi.searchTracks(search).then(res =>{
            if (cancel) return 
            setSearchResults(res.body.tracks.items.map(track =>{
                const smallestAlbumImage = track.album.images.reduce((smallest,
                     image) =>{
                        if(image.height < smallest.height) return image
                        return smallest
                    }, track.album.images[0])

                return {
                    artistName: track.artists[0].name,
                    title: track.name,
                    // genre = data.body,
                    uri: track.uri,
                    albumUrl: smallestAlbumImage.url
                }
            }))
        })

        return() => cancel = true
    }, [search, accessToken])


    return (
        <div className="flex flex-col py-2 h-screen">
            <input 
                type="search" 
                placeholder="Search Songs/Artists" 
                value={search} 
                onChange={e => setSearch(e.target.value)}
                className="border border-gray-300 rounded p-2"
            />
            <div className="flex-grow my-2 overflow-y-auto"> 
                {searchResults.map(track => (
                    <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack} />
                ))}
                {searchResults.length === 0 && (
                    <div className="text-center whitespace-pre">
                        {lyrics}
                    </div>
                )}
            </div>
            <div> 
                <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
            </div>
        </div>
    );
    
}
