// Imports
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { useState } from 'react';
import { searchGames } from "./services/gameService";
import Home from "./pages/Home";


// App Component
function App() {
  // search functionality
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = async (query) => {
    const results = await searchGames(query);
    setSearchResults(results);
  };

  return (
    <>
      <Router>
        <div className="app">
          <Header onSearch={handleSearch}/>
          <Routes>
            <Route path="/" element={<Home searchResults={searchResults} />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
