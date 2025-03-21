import logo from './logo.svg';
import './App.css';
import React from 'react';

import Navbar from './components/Navbar';
import Signin from './components/Signin';

import { auth } from './config/firebase';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

function App() {
  const [location, setLocation] = React.useState('');

  return (
    <Router>
      {/* Render Navbar only if the current path isn't '/' */}
      {location !== '/' && <Navbar />}
      
      <Routes>
        <Route 
          path="/" 
          element={<Signin setLocation={setLocation} />} 
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
