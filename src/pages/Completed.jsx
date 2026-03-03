// Imports
import GameGrid from "../components/GameGrid";
import { useState, useEffect } from "react";
import ErrorScreen from "../components/ErrorScreen";
import LoadingScreen from "../components/LoadingScreen";
import { useCompleted } from "../contexts/CompletedContext";

// Function
function Completed({searchQuery}) {
    const {completed} = useCompleted();

    // display search results or free games
    const query = typeof searchQuery === "string" ? searchQuery.toLowerCase() : "";
    const displayCompleted = query.length > 0 ? completed.filter(game => game.title.toLowerCase().includes(query)) : completed;

    console.log(displayCompleted);


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