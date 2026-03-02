// Imports
import { useState, useEffect } from "react";


function GameCard({game}) {
    // favorites
    const [isFavorite, setIsFavorite] = useState(false);
    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isGameFavorite = favorites.some(fav => fav.id === game.id);
        setIsFavorite(isGameFavorite);
    }, [game.id]);

    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (isFavorite) {
            const updatedFavorites = favorites.filter(fav => fav.id !== game.id);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setIsFavorite(false);
        } else {
            favorites.push(game);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            setIsFavorite(true);
        };
    };

    // play-later



    // completed


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
            </div>
        </>
    );

};

export default GameCard;