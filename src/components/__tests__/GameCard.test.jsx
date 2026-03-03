import { render, screen } from '@testing-library/react';
import GameCard from '../GameCard';
import { BrowserRouter } from 'react-router-dom';
import {vi} from 'vitest';
import { usePlayLater } from '../../contexts/PlayLaterContext';

// mock context
vi.mock('../../contexts/PlayLaterContext', () => ({
    usePlayLater: () => ({
        addToPlayLater: vi.fn(),
        removeFromPlayLater: vi.fn(),
        isInPlayLater: () => false
    })
}));

vi.mock('../../contexts/CompletedContext', () => ({
    useCompleted: () => ({
        addToCompleted: vi.fn(),
        removeFromCompleted: vi.fn(),
        isInCompleted: () => false
    })
}));

const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('GameCard', () => {
    // mock
    const mockGame = {
        id: 1,
        title: "Metal Gear Solid",
        thumbnail: "test-image.jpg",
        platform: "PlayStation",
        genre: "Action",
        short_description: "Test description",
        publisher: "Konami"
    };
    
    test('displays game info without issue', () => {
        renderWithRouter(
            <GameCard game={mockGame} />
        );

        expect(screen.getByText("Metal Gear Solid")).toBeInTheDocument();
        expect(screen.getByText("PlayStation")).toBeInTheDocument();
        expect(screen.getByText("Test description")).toBeInTheDocument();
        expect(screen.getByText("Konami")).toBeInTheDocument();
    });

});

