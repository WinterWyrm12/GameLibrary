// Imports
import { createContext, useState, useContext, useEffect } from "react";


// game context - for Completed
const CompletedContext = createContext();

export function useCompleted() {
    const context = useContext(CompletedContext);
    if (!context) {
        throw new Error('useCompleted must be used within CompletedProvider');
    }
    return context;
};

// provider
export function CompletedProvider({children}) {
    const [completed, setCompleted] = useState(() => {
        const saved = localStorage.getItem("completed");
        return saved ? JSON.parse(saved) : []; 
    });
    
    useEffect(() => {
        localStorage.setItem("completed", JSON.stringify(completed));
    }, [completed]);

    const addToCompleted = (game) => {
        if (!completed.some(r => r.id === game.id)) {
            setCompleted(prev => [...prev, game]);
        };
    };

    const removeFromCompleted = (gameId) => {
        setCompleted(prev => prev.filter(game => game.id !== gameId));
    };

    const isInCompleted = (gameId) => {
        return completed.some(game => game.id === gameId);
    };

    const value = {
        completed,
        addToCompleted,
        removeFromCompleted,
        isInCompleted
    };

    return (
        <CompletedContext.Provider value={value}>
            {children}
        </CompletedContext.Provider>
    );
};