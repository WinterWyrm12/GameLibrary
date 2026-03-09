// Imports
import GameGrid from "../components/GameGrid";
import { useState, useEffect } from "react";
import ErrorScreen from "../components/ErrorScreen";
import LoadingScreen from "../components/LoadingScreen";
import { useAuth } from "../contexts/AuthContext";


// Function
function Favorites({searchQuery}) {
    // favorites + error and loading
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    // load favorites
    useEffect(() => {
        try {
            setLoading(true);
            setError(null);
            const loadFavorites = () => {
                const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
            setFavorites(storedFavorites);
            };
            loadFavorites();
        } catch (err) {
            setError("Failed to load favoites.");
            setFavorites([]);
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
    const displayFavorites = query.length > 0 ? favorites.filter(game => game.title.toLowerCase().includes(query)) : favorites;

    return (
        <>
            <main className="main-content">
                <div className="content-header">
                    <h2>My Favorites</h2>
                    <p>All your favorite free games!</p>
                </div>
                {displayFavorites.length > 0 ? (
                    <GameGrid games={displayFavorites} />
                ) : (
                    <div className="empty-state">
                        <p>No favorite games yet. Start adding some from the Browse page!</p>
                    </div>
                )}
            </main>
        </>
    );
};

export default Favorites;