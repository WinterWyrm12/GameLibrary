// Imports
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCompleted } from '../contexts/CompletedContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';



// Function
function Header({onSearch}) {
    // search functionality
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = () => {
        if (searchQuery.trim()) {
            onSearch(searchQuery);
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };
    const {savedCompleted} = useCompleted()
    const {user, isAuthenticated, logout, hasRole} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/' , {replace: true});
    };

    return (
        <>
            <header className="header">
                <div className="header-top">
                    {/* Authemtication */}
                    {isAuthenticated && (
                        <Link 
                        to="/saved" 
                        className={`nav-link ${location.pathname === '/completed' ? 'active' : ''}`}
                        >
                        </Link>
                        )} {hasRole('admin') && (
                        <Link to="/completed" className="nav-link admin-link">⭐</Link>
                    )}

                    <div className="auth-section">
                        {isAuthenticated ? (
                            <div className="user-info">
                                <span className="username">{user.username} </span>
                                {user.role === 'admin' && 
                                (<span className="admin-badge">Admin</span> )
                                }
                                <button onClick={handleLogout} className="logout-link">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="login-link">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
                <div className="header-nav">
                    <Link to="/" className="app-title">GameLibrary</Link>
                    <nav className="navbar">
                        <Link to="/" className="nav-link">Browse</Link>
                        <Link to="/play-later" className="nav-link">Play-Later</Link>
                        <Link to="/favorites" className="nav-link">Favorites</Link>
                        <Link to="/completed" className="nav-link">Completed</Link>
                    </nav>
                </div>
                <div className="header-search">
                    <input
                        type="text"
                        placeholder="🔍 Search the Library..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => {setSearchQuery(e.target.value);}}
                        onKeyDown={(e) => { if (e.key === "Enter") onSearch(searchQuery);}}
                    />
                    <button className="search-btn" onClick={() => onSearch(searchQuery)}>▶</button>
                </div>
            </header>
        </>
    );
};



// Export
export default Header