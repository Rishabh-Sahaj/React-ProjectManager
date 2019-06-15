import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Dashboard from './components/dashboard/Dashboard'
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/projects/CreateProject';
import ProjectDetails from './components/projects/ProjectDetails';
import firebase from './config/fbconfig'; // I tried to put this import in index.js and use 'firebase' here but it did not work. firebase was undefined in 'firebase.frestore()'.


//For developing app, firstly you can make the flow chart of components, then do the templating only of all the components(hardcoding all the content) and set all the corresponding routes, then check the app's working after adding dummy data to the state and syncing with the components' content to give UI according to the state. And then can remove dummy data and add backend into app with dummy data coming from backend and syncing with the state to give UI accordingly. Then Just Post to backend / database for new data and it will shown on the UI. 

//If you think you can take project directly from the create project form to update state of App.js and post to the backend separately then may be it would lead faster update on UI but the state s not synced with backend. It means when refresh the page or close the window and again open the app, then you will not see the previously added projects even though they are present in the database, because the state will be the one as defined in the class not having the previously added projects as it is not synced with the backend / getting its data from backend.     

//NOTE: In App.js get request is present in componentDidMount which is syncing with DB evertime we refresh. If you will remove it then above thing will happen when we update App.js state from createProject state and not from data from DB (which is get through get request).  Also we would want only that data to update the state which would go through some process like authentication and then stored in DB. Plus in our case we want id of projects in the state to be one that is made by firstore as document ID, how will we do that unless we get data and thn update the state with that.

// We would need one Get request after Post to sync (UI) with DB for real-time update in UI OR we could use real-time DB like Firestore has feature of real-tie updates.

class App extends Component {
   state = {
     projects: []
   }
  
   componentDidMount() {
    const db = firebase.firestore(); 
    db.collection('projects').get().then((snapshot) => {
      console.log(snapshot.docs);
      snapshot.docs.forEach( (doc) => { 

        let project_title= doc.data().title;
        let project_content= doc.data().content;
      
        this.setState({
          projects: [...this.state.projects, {title: project_title, content: project_content, date: new Date(), id: doc.id}]
        });
        console.log(this.state); 
      });   
     });  //get request( Asyn )
   }



   addProject = () => {
    firebase.firestore().collection('projects').get().then((snapshot) => {
      
      console.log(snapshot.docs);
        let project_title = snapshot.docs[0].data().title;
        let project_content = snapshot.docs[0].data().content;
      
        this.setState({
          projects: [...this.state.projects, {title: project_title, content: project_content, date: new Date(), id: snapshot.docs[0].id}]
        });
        console.log(this.state); 
        
     });  //get request( Asyn )
    // this.componentDidMount();
   }

   render() {

      return (
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Route exact path='/' render={(routeProps) => (<Dashboard {...routeProps} Projects={this.state.projects} />)}  />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create' render={(routeProps) => (<CreateProject {...routeProps} addProject={this.addProject} />)} />
            <Route path='/project/:id' component={ProjectDetails} />
          </div>
        </BrowserRouter>
      );
   }
}

export default App;
