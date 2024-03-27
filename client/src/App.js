import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/HomePage';
import Work from './pages/WorkPage';
import Contact from './pages/ContactPage';
import Admin from './pages/AdminPage';
import Navbar from './components/Navbar';

function App() {
  return (

    <div className="App">

      <Router>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/work" element ={<Work />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
