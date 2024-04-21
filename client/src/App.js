import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/HomePage';
import Work from './pages/WorkPage';
import Contact from './pages/ContactPage';
import Admin from './pages/AdminPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import { AuthProvider } from './services/UserContext';
import PrivateRoute from './components/PrivateRoute';
import { ProjectsProvider } from './services/ProjectsContext';
function App() {
  return (

    <div className="App">
      <AuthProvider>
        <ProjectsProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/work" element={<Work />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<PrivateRoute />}>
                <Route index element={<Admin />} />
              </Route>
            </Routes>
            <Footer />
          </Router>
        </ProjectsProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
