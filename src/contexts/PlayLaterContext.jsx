// Imports
import { createContext, useState, useContext, useEffect } from "react";


// game context - for PlayLater
const PlayLaterContext = createContext();

export function usePlayLater() {
    const context = useContext(PlayLaterContext);
    if (!context) {
        throw new Error('usePlayLater must be used within PlayLaterProvider');
    }
    return context;
};

// provider
export function PlayLaterProvider({children}) {
    const [playLater, setPlayLater] = useState(() => {
        const saved = localStorage.getItem("playLater");
        return saved ? JSON.parse(saved) : []; 
    });
    
    useEffect(() => {
        localStorage.setItem("playLater", JSON.stringify(playLater));
    }, [playLater]);

    const addToPlayLater = (game) => {
        if (!playLater.some(r => r.id === game.id)) {
            setPlayLater(prev => [...prev, game]);
        };
    };

    const removeFromPlayLater = (gameId) => {
        setPlayLater(prev => prev.filter(game => game.id !== gameId));
    };

    const isInPlayLater = (gameId) => {
        return playLater.some(game => game.id === gameId);
    };

    const value = {
        playLater,
        addToPlayLater,
        removeFromPlayLater,
        isInPlayLater
    };

    return (
        <PlayLaterContext.Provider value={value}>
            {children}
        </PlayLaterContext.Provider>
    );
};