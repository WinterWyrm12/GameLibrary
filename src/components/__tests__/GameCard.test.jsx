import { render, screen } from '@testing-library/react';
import GameCard from '../GameCard';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { CompletedProvider } from '../../contexts/CompletedContext';
import { PlayLaterProvider } from '../../contexts/PlayLaterContext';
import '@testing-library/jest-dom';

// mock game
const mockGame = {
  id: 1,
  title: "Metal Gear Solid",
  thumbnail: "test-image.jpg",
  platform: "PlayStation",
  genre: "Action",
  short_description: "Test description",
  publisher: "Konami"
};

const renderWithProviders = (ui) => {
    return render(
        <AuthProvider>
            <PlayLaterProvider>
                <CompletedProvider>
                    <MemoryRouter>{ui}</MemoryRouter>
                </CompletedProvider>
            </PlayLaterProvider>
        </AuthProvider>
    );
};

describe('GameCard', () => {
    test('displays game info without issue', () => {
        renderWithProviders(<GameCard game={mockGame} />);

        expect(screen.getByText("Metal Gear Solid")).toBeInTheDocument();
        expect(screen.getByText("PlayStation")).toBeInTheDocument();
        expect(screen.getByText("Test description")).toBeInTheDocument();
        expect(screen.getByText("Konami")).toBeInTheDocument();
    });
});