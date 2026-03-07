export async function GET() {
    const res = await fetch('https://www.freetogame.com/api/games');
    const data = await res.json();

    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
    });
}