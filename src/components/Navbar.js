import './Navbar.css';
import logo from '../images/logo.png';
import { React, useContext, useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { UserContext } from '../App';

function Navbar(props) {
  const [signnedIn, setSignnedIn] = useState(false);
  const {user, setUser} = useContext(UserContext)
  console.log(auth)
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setSignnedIn(null);
      localStorage.setItem('userEmail', "");
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };


  useEffect(()=>{      console.log(signnedIn);  },[])

  var signed = signnedIn ? 'Sign-Out' : 'Sign-In';

  const navItems = ['', '', '', signed];

  useEffect(() => {
    const navCheck = document.getElementById('nav-check');
    const navLinks = document.querySelector('.nav-links');

    const handleChange = () => {
      if (navCheck.checked) {
        reduceZ()        
      } else {
        setTimeout(increaseZ,400) // Reset to default height
      }
    };

    navCheck.addEventListener('change', handleChange);

    return () => {
      navCheck.removeEventListener('change', handleChange);
    };
  }, []);

  function increaseZ(){
    console.log('The Other rule has been triggered!');
    const el = document.querySelector('.z-applicable')
    if (el){
      el.style.zIndex = 0;
      el.style.position = '';
    }

  }

  // Function to be triggered when the CSS rule is applied
  function reduceZ() {
    console.log('The CSS rule has been triggered!');
    console.log('The Other rule has been triggered!');
    const el = document.querySelector('.z-applicable')
    if (el){
      el.style.zIndex = -1;
      el.style.position = 'relative';
    }
  }


  return (
    <>
      <div className="nav navbar fadeInDown animate-fadeInDown">
        <input type="checkbox" id="nav-check" />
        <div className="nav-header">
          <div className="nav-title">
            <NavLink to="/">
              <img src={logo} className="logo" alt="Logo" />
            </NavLink>
          </div>
        </div>
        <div className="nav-btn">
          <label htmlFor="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <div className="nav-links navbar-items">
          <NavLink to={`/artifacts`}>Home</NavLink>
          {user && <NavLink onClick={handleSignOut}>Sign-Out</NavLink>}
          {!user && <NavLink to="/signin">Sign-In</NavLink>}
        </div>
      </div>
      <main>
        <Outlet></Outlet>
      </main>

    </>
  );
}

export default Navbar;
