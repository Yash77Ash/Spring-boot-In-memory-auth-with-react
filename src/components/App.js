import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';    // Home page
import Career from './Career';  // Career page
import About from './About';    // About page
import './App.css';
import Login from './Login';
import AppContent from './AppContent';

function App() {
  return (
   
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />       {/* Home Page */}
          <Route path="/career" element={<Career />} /> {/* Career Page */}
          <Route path="/about" element={<About />} />   {/* About Page */}
          <Route path="/login" element={<Login />} />   {/* About Page */}
          <Route path="/AppContent" element={<AppContent />} />   {/* About Page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
