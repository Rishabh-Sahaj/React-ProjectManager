import React, { Component } from 'react';
import firebase from '../../config/fbconfig';
import { Redirect } from 'react-router-dom';

class CreateProject extends Component {
  state = {
    title: '',
    content: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    firebase.firestore().collection('projects').add({
      ...this.state,
      authorFirstName: this.props.appState.user.firstName,
      authorLastName: this.props.appState.user.lastName,
      authorID: this.props.appState.user.userID,
      date: new Date()
    }).then((resp) => {
      console.log(resp);  
      //this.props.addProject(this.state); we would not be able to get doc id and store it in state so we need get request.
        const db = firebase.firestore(); 
        return db.collection('projects').get();

    }).then((snapshot) => {//get request( Asyn )
        
        let newState = [];        
        snapshot.docs.forEach( (doc) => {          
          newState = [...newState , {...doc.data(), id: doc.id}];
        });   
        console.log(newState);
        this.props.setProjectsOnState(newState);



        this.props.history.push('/'); //after everything has gone successfull we redirect to dashboard

    }).catch((err) => {  
      this.props.setErrorOnState(err.message);
    });
  }

  render() {
    const {authenticated,error} = this.props.appState;

    if(!authenticated) {
      return <Redirect to='/signin' />;
    }
    else{
      return (
        <div className="container">
          <form className="white" onSubmit={this.handleSubmit}>
            <h5 className="grey-text text-darken-3">Create a New Project</h5>
            <div className="input-field">
              <input type="text" id='title' onChange={this.handleChange}  required/>
              <label htmlFor="title">Project Title</label>
            </div>
            <div className="input-field">
              <textarea id="content" className="materialize-textarea" onChange={this.handleChange} required></textarea>
              <label htmlFor="content">Project Content</label>
            </div>
            <div className="input-field">
              <button className="btn pink lighten-1">Create</button>
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

export default CreateProject;
