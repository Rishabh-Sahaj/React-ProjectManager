import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const Navbar = (props) => {

    const links = props.appState.authenticated ? <SignedInLinks setAuthenticatedOnState={props.setAuthenticatedOnState} appState={props.appState} /> : <SignedOutLinks />;
    return (
      <nav className='nav-wrapper grey darken-3'>
        <div className='container'>
          <Link to='/' className="brand-logo">Project Manager</Link>
          { links }
        </div>
      </nav>
    );
};

export default Navbar; 