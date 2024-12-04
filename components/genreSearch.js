async function getGenres(artist, track) {
    
    try {
        // Construct the URL with the necessary query parameters
        
        const url = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}&api_key=53b91d3dfdd187ca16c1aeef4e6661a3&format=json`;

        // Send the request
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch genres');
        }

        const data = await response.json();

        const tags = data.track && data.track.toptags.tag;
        if (tags && tags.length > 0) {
            // Extract the top three tags
            const topTags = tags.slice(0, 3).map(tag => tag.name);

            return topTags; // Return array of top three tags
        } else {
            return ['no genre']; // Return array with 'Genre not found' if no tags found
        }
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

export { getGenres };
