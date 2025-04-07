import logo from './logo.svg';
import './App.css';
import React from 'react';

import Navbar from './components/Navbar';
import Signin from './components/Signin';
import Home from './components/Home';

import { auth } from './config/firebase';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import Artists from './components/Artists';

function App() {
  const [location, setLocation] = React.useState('');

  return (
    <Router>
      {/* Render Navbar only if the current path isn't '/' */}
      {location !== '/' && <Navbar />}
      
      <Routes>
        <Route 
          path="/" 
          element={<Home setLocation={setLocation} />} 
        />
        <Route 
          path="/artifacts" 
          element={<Home setLocation={setLocation} />} 
        />
        <Route 
          path="/artists" 
          element={<Artists setLocation={setLocation} />} 
        />
        <Route 
          path="/signin" 
          element={<Signin setLocation={setLocation} />} 
        />
        {/* Catch-all route */}
        <Route 
          path="*" 
          element={<Signin setLocation={setLocation} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
