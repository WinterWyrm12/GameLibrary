const API_URL = import.meta.env.VITE_GAME_API_URL;

// free games
export async function getFreeGames() {
    const response = await fetch(
        "/api/games"
    );

    if (!response.ok) {
        throw new Error("Failed to fetch games.")
    };

    return await response.json();
};

// search query
export async function searchGames(query) {
    const response = await fetch(
        "/api/games"
    );
    
    if (!response.ok) {
        throw new Error("Failed to search games.")
    };

    const games = await response.json();

    // workaround for freetogame's smaller api search system
    return games.filter(game => game.title.toLowerCase().includes(query.toLowerCase()));
};