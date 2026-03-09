// Imports
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";
import Login from "../Login";
import '@testing-library/jest-dom';

describe("login component", () => {
    test("renders login form", () => {
        render(
            <AuthProvider>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </AuthProvider>
        );

        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    });

    test("shows error when username or password is empty", () => {
        render(
            <AuthProvider>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </AuthProvider>
        );
        fireEvent.click(screen.getByRole("button", { name: /login/i }));
        expect(screen.getByText(/Please complete both username and password fields/i)).toBeInTheDocument();
    });
});