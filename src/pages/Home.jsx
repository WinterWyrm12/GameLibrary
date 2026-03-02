// Imports
import GameGrid from "../components/GameGrid";
import { useState, useEffect } from "react";
import { getFreeGames } from "../services/gameService";
import ErrorScreen from "../components/ErrorScreen";



// Function
function Home({searchResults}) {
    // main content + error and loading
    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);
    // loading states go here
    useEffect(() => {
        const fetchGames = async () => {
            try{
                // loading
                setError(null);
                const gameData = await getFreeGames();
                setGames(gameData);
            } catch (err) {
                setError("Failed to load games. Please try again later.");
                setGames([]);
            } finally {
                //set loading state to false
            }
        };

        fetchGames();
    }, []);

    // loading

    if (error) {
        return (
            <main className="main-conntent">
                <ErrorScreen message={error} />
            </main>
        );
    };

    // display search results or free games
    const displayGames = searchResults.length > 0 ? searchResults : games;

    return (
        <>
            <main className="main-content">
                <div className="content-header">
                    <h2>{searchResults.length > 0 ? "Search Results" : "Free Games"}</h2>
                    <p>Discover and keep track of all the free games!</p>
                </div>
                <GameGrid games={displayGames} />
            </main>
        </>
    );
};

export default Home;