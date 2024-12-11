import fetch from 'node-fetch';
import https from 'https';

const agent = new https.Agent({ rejectUnauthorized: false });

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const artist = searchParams.get('artist');
    const track = searchParams.get('track');

    if (!artist || !track) {
        return new Response(
            JSON.stringify({ error: 'Artist and track are required.' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const apiUrl = `https://api.textyl.co/api/lyrics?q=${encodeURIComponent(`${artist} ${track}`)}`;

    try {
        const response = await fetch(apiUrl, { agent });

        if (!response.ok) {
            throw new Error('Failed to fetch lyrics from external API.');
        }

        const data = await response.json();
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching lyrics:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch lyrics' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
