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
      console.log(this.state); 

      //user sign in
      let auth = firebase.auth();
      auth.signInWithEmailAndPassword(this.state.email,this.state.password).then( (credToken) => {
        const db = firebase.firestore(); 
        //Do error handeling too
        db.collection('projects').get().then((snapshot) => {//get request( Asyn )
          let newState = [];        
          snapshot.docs.forEach( (doc) => { 
            let project_title= doc.data().title;
            let project_content= doc.data().content;          
            newState = [...newState , {title: project_title, content: project_content, date: new Date(), id: doc.id}];
          });   
          console.log(newState);          
          this.props.setAuthenticatedOnState(true,newState);  
        });  //then
      }).catch( (err) => {
        this.props.setAuthenticatedOnState(false, []);
      }); //Async i.e, returns a promise
    }
    render() {

      if(this.props.auth) {
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
              </div>
            </form>
          </div>
        );
      }
    }
}
export default SignIn;