// Imports
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { useState } from 'react';
import { searchGames } from "./services/gameService";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";


// App Component
function App() {
  // search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Router>
        <div className="app">
          <Header onSearch={handleSearch}/>
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/favorites" element={<Favorites searchQuery={searchQuery} />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
