// Imports
import {render,screen} from '@testing-library/react';
import GameGrid from '../GameGrid';

// mock gameCard
vi.mock('../GameCard', () => ({
    default: ({game}) => <div>{game.name}</div>
}));

describe('GameGrid', () => {
    const mockGames =[
        {
            id: 1,
            name: "Metal Gear Solid",
        },
        {
            id: 2,
            name: "Metal Gear Solid 2: Sons of Liberty",
        }
    ];

    // render
    test('renders games without crashing', () => {
        render(
            <GameGrid games={mockGames} />
        );

        expect(screen.getByText("Metal Gear Solid")).toBeInTheDocument();
        expect(screen.getByText("Metal Gear Solid 2: Sons of Liberty")).toBeInTheDocument();
    });
});