// Imports
import GameGrid from "../components/GameGrid";
import { useState, useEffect } from "react";
import ErrorScreen from "../components/ErrorScreen";
import LoadingScreen from "../components/LoadingScreen";

// Function
function Completed({searchQuery}) {
    // completed + error and loading
    const [completed, setCompleted] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    // load completed
    useEffect(() => {
        try {
            setLoading(true);
            setError(null);
            const loadCompleted = () => {
                const storedCompleted = JSON.parse(localStorage.getItem("completed")) || [];
            setCompleted(storedCompleted);
            };
            loadCompleted();
        } catch (err) {
            setError("Failed to load completed.");
            setCompleted([]);
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
    const displayCompleted = query.length > 0 ? completed.filter(game => game.title.toLowerCase().includes(query)) : completed;

    return (
        <>
            <main className="main-content">
                <div className="content-header">
                    <h2>Completed Games</h2>
                    <p>All games you've finished!</p>
                </div>
                {displayCompleted.length > 0 ? (
                    <GameGrid games={displayCompleted} />
                ) : (
                    <div className="empty-state">
                        <p>No games on your list. Start adding some from the Browse page!</p>
                    </div>
                )}
            </main>
        </>
    );
};

export default Completed;