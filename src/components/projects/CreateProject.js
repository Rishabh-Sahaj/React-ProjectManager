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
      authorFirstName: 'YO',
      authorLastName: 'YO',
    }).then((resp) => {
      console.log(resp);  
      //this.props.addProject(this.state); we would not be able to get doc id and store it in state so we need get request.

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
        this.props.setProjectsOnState(newState);
      });

    });
 }
  render() {
    const {authenticated} = this.props.appState;

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
            </div>
          </form>
        </div>
      );
    }
  }
}

export default CreateProject;
