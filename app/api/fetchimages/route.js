export async function GET(request) {
    try {
        const folderName = "country";
        console.log(folderName);

        // Get the URL from the request
        const url = new URL(request.url);

        // Retrieve the 'genre' query parameter (it may contain multiple genres)
        const genres = url.searchParams.get('genre');  // This will get the whole 'genre' query string

        if (!genres) {
            return new Response(JSON.stringify({ error: 'No genre provided' }), { status: 400 });
        }

        // If there are multiple genres, they will be separated by '&'
        const genreList = genres.split('&').map(genre => genre.trim());

        // Join the genres with a comma and replace spaces with '%20'
        const genresParam = genreList.map(genre => encodeURIComponent(genre)).join(',');

        // Now you can use genreList to fetch images, process the genres, etc.
        console.log('Genres:', genreList);

       
         // Get all 'genre' query parameters
        const response = await fetch(`https://script.google.com/macros/s/AKfycbyfUP2KfH1IxwTJn37zyS0Eh52jas3ilzp-0Dw1rqGIl790OOTt5k76SfJ9MEVOvrBA/exec?folderName=${genresParam}`);
        const data = await response.json();

        const imageUrls = data.map(fileId => {
            //console.log("File ID:", fileId); // Log each fileId to verify its value
            // Check if fileId is a valid string
            if (typeof fileId === 'string' && fileId.trim() !== '') {
                return `https://drive.google.com/uc?export=view&id=${fileId.trim()}`;
            } else {
                console.error("Invalid file ID:", fileId);
                return null; // Or handle the error appropriately
            }
        });

        return Response.json({ imageUrls});
    }
        catch(error){
            response.status(500).json({ error: "INTERNAL SERVER ERROR"})
        }
}