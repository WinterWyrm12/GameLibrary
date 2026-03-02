// Imports
import GameGrid from "../components/GameGrid";
import { useState, useEffect } from "react";
import { getFreeGames } from "../services/gameService";
import ErrorScreen from "../components/ErrorScreen";
import LoadingScreen from "../components/LoadingScreen";



// Function
function Home({searchQuery}) {
    // main content + error and loading
    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchGames = async () => {
            try{
                setLoading(true);
                setError(null);
                const gameData = await getFreeGames();
                setGames(gameData);
            } catch (err) {
                setError("Failed to load games. Please try again later.");
                setGames([]);
            } finally {
                setLoading(false)
            }
        };

        fetchGames();
    }, []);

    if (loading) {
        return (
            <main className="main-content">
                <LoadingScreen />
            </main>
        );
    };

    if (error) {
        return (
            <main className="main-conntent">
                <ErrorScreen message={error} />
            </main>
        );
    };

    // display search results or free games
    const query = typeof searchQuery === "string" ? searchQuery.toLowerCase() : "";
    const displayGames = query.length > 0 ? games.filter(game => game.title.toLowerCase().includes(query)) : games;

<GameGrid games={displayGames} />

    return (
        <>
            <main className="main-content">
                <div className="content-header">
                    <h2>{searchQuery.length > 0 ? "Search Results" : "Free Games"}</h2>
                    <p>Discover and keep track of all the free games!</p>
                </div>
                {displayGames.length > 0 ? (<GameGrid games={displayGames} />
                ) : (
                <p>No games found{searchQuery ? ` for "${searchQuery}"` : ""}.</p>
                )}
            </main>
        </>
    );
};

export default Home;