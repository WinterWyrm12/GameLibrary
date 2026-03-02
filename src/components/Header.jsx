// Imports
import { Link } from 'react-router-dom';
import { useState } from 'react';


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

    return (
        <>
            <header className="header">
                <div className="header-top">
                    <Link to="" className="login-link">Login</Link>
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
                        onChange={(e) => {
                            const value = e.target.value;
                            setSearchQuery(value);
                            onSearch(value);
                        }}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="search-btn" onClick={handleSearch}>▶</button>
                </div>
            </header>
        </>
    );
};



// Export
export default Header