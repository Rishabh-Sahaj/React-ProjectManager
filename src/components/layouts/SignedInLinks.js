import React from 'react';
import { NavLink } from 'react-router-dom';
import firebase from '../../config/fbconfig';

const SignedInLinks = (props) => {
    
    const handleClick = () => {
      //user sign in
      let auth = firebase.auth();
      auth.signOut().then( (credToken) => {
        console.log('user has signed out', credToken); //here credToken will be / is undefined, means no response is sent back.
        props.setAuthenticatedOnState(false);//Note that even if you don't turn it false, at the backend (firebase) user has been logged out, i.e, un-authenticated, and can't be changed back unless signInWithEmailAndPassword() function is called on the user.
        props.setErrorOnState(null);
      });
    };

    return (
      <div className='signedInLinks right'>
        <ul>
          <li><NavLink to='/create'>New Project</NavLink></li>    
          <li><NavLink to='/' onClick={handleClick}>Log Out</NavLink></li>    
          <li><NavLink to='/' className="btn btn-floating pink lighten-1">{props.appState.user.initials}</NavLink></li>    
        </ul>  
      </div>
    );
};

export default SignedInLinks; 