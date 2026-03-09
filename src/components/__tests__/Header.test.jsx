// Imports
import { render, screen } from "@testing-library/react";
import Header from "../Header";
import { MemoryRouter } from "react-router-dom";
import { PlayLaterProvider } from "../../contexts/PlayLaterContext";
import { CompletedProvider } from "../../contexts/CompletedContext";
import { AuthProvider } from "../../contexts/AuthContext";
import '@testing-library/jest-dom'

const renderWithProviders = (ui) => {
    return render(
        <AuthProvider>
            <PlayLaterProvider>
                <CompletedProvider>
                    <MemoryRouter>
                        {ui}
                    </MemoryRouter>
                </CompletedProvider>
            </PlayLaterProvider>
        </AuthProvider>
    );
};

describe("renders Header", () => {
    test("renders properly", () => {
        renderWithProviders(<Header/>);
    
        expect(screen.getByText(/GameLibrary/i)).toBeInTheDocument();
    });
});