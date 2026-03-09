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
import { PlayLaterProvider } from "./contexts/PlayLaterContext";
import { CompletedProvider } from "./contexts/CompletedContext";
import NotFound from "./components/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";


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
    <AuthProvider>
      <PlayLaterProvider>
        <CompletedProvider>
          <Router>
            <div className="app">
              <Header onSearch={handleSearch}/>
              <Routes>
                <Route path="/" element={<Home searchQuery={searchQuery} />} />
                <Route path="/favorites" element={<ProtectedRoute><Favorites searchQuery={searchQuery} /> </ProtectedRoute>} />
                <Route path="/play-later" element={ <ProtectedRoute><PlayLater searchQuery={searchQuery} /> </ProtectedRoute>} />
                <Route path="/completed" element={<ProtectedRoute> <Completed searchQuery={searchQuery} /> </ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
        </CompletedProvider>
      </PlayLaterProvider>
    </AuthProvider>
  )
}

export default App
