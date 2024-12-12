// Import a string similarity library (install it using `npm install string-similarity`)
// Alternatively, implement a basic Levenshtein distance function.
import stringSimilarity from 'string-similarity';

export async function GET(request) {
    try {
        const folderName = "country";
        console.log(folderName);

        // Get the URL from the request
        const url = new URL(request.url);

        // Retrieve the 'genre' query parameter (it may contain multiple genres)
        const genres = url.searchParams.get('genre');

        if (!genres) {
            return new Response(JSON.stringify({ error: 'No genre provided' }), { status: 400 });
        }

        const genreResponse = await fetch(`https://script.google.com/macros/s/AKfycbxg66d5nIkR92mJwrOgpUdAPCXZug5pMOumsphAHMRNYcwDDTTi8dIBdl5Em-ucvkjC/exec`);
        if (!genreResponse.ok) {
            throw new Error('Failed to get folder names');
        }
        const availableGenres = await genreResponse.json();

        // If there are multiple genres, they will be separated by '&'
        const genreList = genres.split('&').map(genre => genre.trim());

        // Find the closest match for each genre
        const matchedGenres = genreList.map(inputGenre => {
            const { bestMatch } = stringSimilarity.findBestMatch(inputGenre, availableGenres);
            console.log(`Input Genre: ${inputGenre}, Closest Match: ${bestMatch.target}`);
            return bestMatch.target;
        });

        // Join the matched genres with a comma and encode them
        const genresParam = matchedGenres.map(genre => encodeURIComponent(genre)).join(',');

        // Fetch data based on the matched genres
        const response = await fetch(`https://script.google.com/macros/s/AKfycbyfUP2KfH1IxwTJn37zyS0Eh52jas3ilzp-0Dw1rqGIl790OOTt5k76SfJ9MEVOvrBA/exec?folderName=${genresParam}`);
        const data = await response.json();

        const imageUrls = data.map(fileId => {
            if (typeof fileId === 'string' && fileId.trim() !== '') {
                return `https://drive.google.com/uc?export=view&id=${fileId.trim()}`;
            } else {
                console.error("Invalid file ID:", fileId);
                return null;
            }
        });

        return Response.json({ imageUrls });
    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ error: "INTERNAL SERVER ERROR" }), { status: 500 });
    }
}
