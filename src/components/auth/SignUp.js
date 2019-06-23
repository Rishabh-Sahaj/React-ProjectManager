import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from '../../config/fbconfig';

class SignUp extends Component {
    state = {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    }
    handleChange = (e) => {
      this.setState({
          [e.target.id]: e.target.value
      });
      console.log(this.state); 
    }
    handleSubmit = (e) => {
      e.preventDefault();
      console.log(this.state); 

      firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((credToken) => {
        // firebase.firestore().collection('user') //createsa collection named 'user' if it doesn't exist
        // .doc()
        console.log('user has signed up', credToken); 
        this.props.setAuthenticatedOnState(true); //Set Authenticated On State
    

        
    // FIRESTORE USER ADD (ASYNC) ( O N L Y   T H I S   I S   D I F F E R E N T   F R O M   S I G N I N   O N E )
        firebase.firestore().collection('users') //It will make the collection named 'users' if it doesn't exist.
        .doc(credToken.user.uid) // It is alternative of add() where document id is generated automatically in the backend, but in doc() id is given in the request / query itself. We want ID of user (uid) in firebase auth and document id of the corresp. user in firestore be the same. We are making that corresp. doc in firestore to store First and last Name. Firebase Auth saves Email, UID etc. only which you can find in credToken.
        .set({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          initials: this.state.firstName[0] + this.state.lastName[0]
        }).then((resp) => {
          console.log('new user has been added', resp);
        }).catch((err) => {  
          this.props.setErrorOnState(err.message); //Set Error On State       
        });
        // END FIRESTORE USER ADD



        //GET THE USER INFO. OF SIGNED IN / AUTHENTCATED USER (ASYNC)
        const db = firebase.firestore(); 
        db.collection('users').doc(credToken.user.uid).get().then((doc) => {
          this.props.setUserOnState(doc.data(), doc.id); // Set User On State
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
          this.props.setErrorOnState(err.message);//Set Error On State
      }); //Async                                      
            
    }




    render() {

      const {authenticated,error} = this.props.appState;
      if(authenticated) {
        return <Redirect to='/' />; 
      } else {
        return (
          <div className="container">
            <form className="white" onSubmit={this.handleSubmit}>
              <h5 className="grey-text text-darken-3">Sign Up</h5>
              <div className="input-field">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id='firstName' onChange={this.handleChange} />
              </div>
              <div className="input-field">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id='lastName' onChange={this.handleChange} />
              </div>
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input type="email" id='email' onChange={this.handleChange} />
              </div>
              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input type="password" id='password' onChange={this.handleChange} />
              </div>
              <div className="input-field">
                <button className="btn pink lighten-1 z-depth-0">Sign up</button>
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
export default SignUp;