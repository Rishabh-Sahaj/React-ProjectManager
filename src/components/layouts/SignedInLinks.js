import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedInLinks = () => {

    return (
      <div className='signedInLinks right'>
        <ul>
          <li><NavLink to='/create'>New Project</NavLink></li>    
          <li><NavLink to='/'>Log Out</NavLink></li>    
          <li><NavLink to='/' className="btn btn-floating pink lighten-1">RD</NavLink></li>    
        </ul>  
      </div>
    );
};

export default SignedInLinks; 