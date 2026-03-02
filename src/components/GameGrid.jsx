// Imports
import GameCard from "./GameCard";


// Function
function GameGrid({games}) {
    return (
        <>
            <div className="game-grid">
                {games.map(game => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>
        </>
    );
};

export default GameGrid;