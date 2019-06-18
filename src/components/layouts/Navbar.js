import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const Navbar = (props) => {

    return (
      <nav className='nav-wrapper grey darken-3'>
        <div className='container'>
          <Link to='/' className="brand-logo">Project Manager</Link>
          <SignedInLinks setAuthenticatedOnState={props.setAuthenticatedOnState} />
          <SignedOutLinks />
        </div>
      </nav>
    );
};

export default Navbar; 