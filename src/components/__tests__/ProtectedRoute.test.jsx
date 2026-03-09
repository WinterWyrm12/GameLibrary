// Imports
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "../../contexts/AuthContext";
import ProtectedRoute from "../ProtectedRoute";
import { act } from "react-dom/test-utils";

const MockComponent = () => <div>Protected Content</div>;

const LoginWrapper = ({ children }) => {
    const { login } = useAuth();
    act(() => {
        login("test-user", "1234");
    });
    return children;
};

describe("protected route component", () => {
    test("redirects users to login", () => {
        render(
            <AuthProvider>
                <MemoryRouter initialEntries={['/protected']}>
                    <Routes>
                        <Route
                            path="/protected"
                            element={
                                <ProtectedRoute>
                                    <MockComponent />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/login" element={<div>Login Page</div>} />
                    </Routes>
                </MemoryRouter>
            </AuthProvider>
        );

        expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
        expect(screen.queryByText(/Protected Content/i)).not.toBeInTheDocument();
    });

    test("allows users to see protected", async () => {
        render(
            <AuthProvider>
                <LoginWrapper>
                    <MemoryRouter initialEntries={['/protected']}>
                        <Routes>
                            <Route
                                path="/protected"
                                element={
                                    <ProtectedRoute>
                                        <MockComponent />
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="/login" element={<div>Login Page</div>} />
                        </Routes>
                    </MemoryRouter>
                </LoginWrapper>
            </AuthProvider>
        );

        expect(await screen.findByText(/Protected Content/i)).toBeInTheDocument();
    });
});