// Imports
import { useState, useEffect } from "react";
import PlayLater from "../pages/Play-Later";
import { usePlayLater } from "../contexts/PlayLaterContext";
import { useCompleted } from "../contexts/CompletedContext";
import { useAuth } from "../contexts/AuthContext";
import { useFormAction } from "react-router-dom";



const GameCard = ({game}) => {
    // play-later
    const {addToPlayLater, removeFromPlayLater, isInPlayLater} = usePlayLater();
    const inPlayLater = isInPlayLater(game.id);
    const handlePlayList = () => {
        if (inPlayLater) {
            removeFromPlayLater(game.id);
        } else {
            addToPlayLater(game);
        };
    };

    // completed
    const {addToCompleted, removeFromCompleted, isInCompleted} = useCompleted();
    const inCompleted = isInCompleted(game.id);
    const handleCompleted = () => {
        if (inCompleted) {
            removeFromCompleted(game.id);
        } else {
            addToCompleted(game);
        };
    };

    // favorites
    const [isFavorite, setIsFavorite] = useState(false);
    const {user} = useAuth();
    useEffect(() => {
        if (!user) {
            setIsFavorite(false);
            return;
        }
        const allFavorites = JSON.parse(localStorage.getItem('favoriteGamesByUser')) || {};
        const storedFavorites = allFavorites[user.username] || [];
        const isGameFavorite = storedFavorites.some(fav => fav.id === game.id);
        setIsFavorite(isGameFavorite);
    }, [game.id, user?.username]);

    const toggleFavorite = () => {
        if (!user) {
            return;
        }

        const allFavorites = JSON.parse(localStorage.getItem('favoriteGamesByUser')) || {};
        const storedFavorites = allFavorites[user.username] || [];

        if (isFavorite) {
            const updatedFavorites = storedFavorites.filter(fav => fav.id !== game.id);
            allFavorites[user.username] = updatedFavorites;
            setIsFavorite(false);
        } else {
            storedFavorites.push(game);
            allFavorites[user.username] = storedFavorites;
            setIsFavorite(true);
        }
        localStorage.setItem('favoriteGamesByUser', JSON.stringify(allFavorites));
    };

    return (
        <>
            <div className="game-card">
                <div className="card-top">
                    <h3>{game.title}</h3>
                    <button className={`favorite-button ${isFavorite ?  'favorited' : ''}`} onClick={toggleFavorite}>
                        {isFavorite ? "★" : "☆"}
                    </button>
                </div>
                <div className="game-poster">
                    <img 
                    src={game.thumbnail}
                    alt={game.title}
                    className="game-cover"
                    />
                    <div className="game-details">
                        <p>{game.platform}</p>
                        <p>{game.genre}</p>
                    </div>
                    <div className="game-info">
                        <p>{game.short_description}</p>
                        <p>{game.publisher}</p>
                    </div>
                </div>
                <div className="card-bottom">
                    <button className={`play-later-btn  ${inPlayLater ? 'added' : ''}`} onClick={handlePlayList}>
                        {inPlayLater ? "✓ Play-Later" : "+ Play-Later"}
                    </button>
                    <button className={`completed-btn  ${inCompleted ? 'added' : ''}`} onClick={handleCompleted}>
                        {inCompleted ? "✓ Completed" : "+ Complete"}
                    </button>
                </div>
            </div>
        </>
    );

};

export default GameCard;