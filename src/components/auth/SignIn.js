import React, { Component } from 'react';
import firebase from '../../config/fbconfig';// I tried to put this import in index.js and use 'firebase' here but it did not work. firebase was undefined in 'firebase.frestore()'.
import { Redirect } from 'react-router-dom';

class SignIn extends Component {
    state = {
      email: '',
      password: ''
    }
    handleChange = (e) => {
      this.setState({
          [e.target.id]: e.target.value
      });
    }
    handleSubmit = (e) => {
      e.preventDefault();

      //user sign in
      let auth = firebase.auth();
      auth.signInWithEmailAndPassword(this.state.email,this.state.password).then((credToken) => {
        console.log('user has signed in', credToken); 
  
        this.props.setAuthenticatedOnState(true); //Set Authenticated On State
         //Note that even if you don't turn it true, at the backend (firebase) user has logged in, i.e, authenticated. This statement is just for the front-end ( as front-end is synced with the state.) ( Firebase authentication states (in the backend offcourse) changes only by firebase auth functions calling,  like signInWithEmailAndPassword(), signout() etc.)



         //GET THE USER INFO. OF SIGNED IN / AUTHENTCATED USER (ASYNC)
         const db = firebase.firestore(); 
         db.collection('users').doc(credToken.user.uid).get().then((doc) => {
           console.log(doc);
           this.props.setUserOnState(doc.data(), doc.id); //Set User On State
         });
        



        //GET THE PROJECTS (ASYNC)
        return db.collection('projects').get();// returns a promise
      
      }).then((snapshot) => {

          let newState = [];        
          snapshot.docs.forEach( (doc) => { 
            newState = [...newState , {...doc.data(), id: doc.id}];
          }); //snapshot.docs            
          this.props.setProjectsOnState(newState); //Set Projects On State 
      
      }).catch((err) => {  
          this.props.setErrorOnState(err.message); //Set Error On State
      }); //Async 
    }


    render() {

      const {authenticated,error} = this.props.appState;

      if(authenticated) {
        return <Redirect to='/' />; 
      }
      else{
        return (
          <div className="container">
            <form className="white" onSubmit={this.handleSubmit}>
              <h5 className="grey-text text-darken-3">Sign In</h5>
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input type="email" id='email' onChange={this.handleChange} />
              </div>
              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input type="password" id='password' onChange={this.handleChange} />
              </div>
              <div className="input-field">
                <button className="btn pink lighten-1 z-depth-0">Sign in</button>
                <div className="red-text center">
                  { error ? <p>{ error }</p> : null }
                </div>
              </div>
            </form>
          </div>
        );
      }
    }
}
export default SignIn;