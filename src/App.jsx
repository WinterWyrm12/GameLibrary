// Imports
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { useState } from 'react';
import { searchGames } from "./services/gameService";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import PlayLater from "./pages/Play-Later";
import Completed from "./pages/Completed";
import { PlayLaterProvider } from "./contexts/GameContext";


// App Component
function App() {
  // search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      return;
    }

    try {
      setLoading(true);
      const results = await searchGames(query);
      setSearchResults(results);
    } catch (err) {
      console.error("Search Error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PlayLaterProvider>
      <Router>
        <div className="app">
          <Header onSearch={handleSearch}/>
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/favorites" element={<Favorites searchQuery={searchQuery} />} />
            <Route path="/play-later" element={<PlayLater searchQuery={searchQuery} />} />
            <Route path="/completed" element={<Completed searchQuery={searchQuery} />} />
          </Routes>
        </div>
      </Router>
    </PlayLaterProvider>
  )
}

export default App
