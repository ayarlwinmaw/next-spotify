// app/api/lyrics/route.js
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const artist = searchParams.get("artist");
    const track = searchParams.get("track");

    if (!artist || !track) {
        return new Response(JSON.stringify({ error: 'Artist and track are required' }), { status: 400 });
    }

    try {
        // Example of fetching lyrics from an external API or service
        // Replace this with the actual API call for lyrics fetching
        const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${track}`);
        const data = await response.json();

        if (data.lyrics) {
            return new Response(JSON.stringify({ lyrics: data.lyrics }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Lyrics not found' }), { status: 404 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch lyrics' }), { status: 500 });
    }
}
