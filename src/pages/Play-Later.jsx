// Imports
import GameGrid from "../components/GameGrid";
import { useState, useEffect } from "react";
import ErrorScreen from "../components/ErrorScreen";
import LoadingScreen from "../components/LoadingScreen";

// Function
function PlayLater({searchQuery}) {
    // playLater + error and loading
    const [playLater, setPlayLater] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    // load playLater
    useEffect(() => {
        try {
            setLoading(true);
            setError(null);
            const loadPlayLater = () => {
                const storedPlayLater = JSON.parse(localStorage.getItem("playLater")) || [];
            setPlayLater(storedPlayLater);
            };
            loadPlayLater();
        } catch (err) {
            setError("Failed to load play-later.");
            setPlayLater([]);
        } finally {
            setLoading(false);
        }
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
            <main className="main-content">
                <ErrorScreen message={error} />
            </main>
        );
    };

    // display search results or free games
    const query = typeof searchQuery === "string" ? searchQuery.toLowerCase() : "";
    const displayPlayLater = query.length > 0 ? playLater.filter(game => game.title.toLowerCase().includes(query)) : playLater;

    return (
        <>
            <main className="main-content">
                <div className="content-header">
                    <h2>Play-Later</h2>
                    <p>All games you want to play!</p>
                </div>
                {displayPlayLater.length > 0 ? (
                    <GameGrid games={displayPlayLater} />
                ) : (
                    <div className="empty-state">
                        <p>No games on your list. Start adding some from the Browse page!</p>
                    </div>
                )}
            </main>
        </>
    );
};

export default PlayLater;