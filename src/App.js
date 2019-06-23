import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Dashboard from './components/dashboard/Dashboard'
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/projects/CreateProject';
import ProjectDetails from './components/projects/ProjectDetails';
// import firebase from './config/fbconfig'; // I tried to put this import in index.js and use 'firebase' here but it did not work. firebase was undefined in 'firebase.frestore()'.


//For developing app, firstly you can make the flow chart of components, then do the templating only of all the components(hardcoding all the content) and set all the corresponding routes, then check the app's working after adding dummy data to the state and syncing with the components' content to give UI according to the state. And then can remove dummy data and add backend into app with dummy data coming from backend and syncing with the state to give UI accordingly. Then Just Post to backend / database for new data and it will shown on the UI. 

//If you think you can take project directly from the create project form to update state of App.js and post to the backend separately then may be it would lead faster update on UI but the state s not synced with backend. It means when refresh the page or close the window and again open the app, then you will not see the previously added projects even though they are present in the database, because the state will be the one as defined in the class not having the previously added projects as it is not synced with the backend / getting its data from backend.     

//NOTE: In App.js get request is present in componentDidMount which is syncing with DB evertime we refresh. If you will remove it then above thing will happen when we update App.js state from createProject state and not from data from DB (which is get through get request).  Also we would want only that data to update the state which would go through some process like authentication and then stored in DB.                                                PLUS in our case we want id of projects in the state to be one that is made by firstore as document ID, how will we do that unless we get data and then update the state with that.

// We would need one Get request after Post to sync (UI) with DB for real-time update in UI OR we could use real-time DB like Firestore has feature of real-tie updates.

class App extends Component {
   state = {
     authenticated: false,
     projects: [],
     user: {},
     error: null
   }

   setAuthenticatedOnState = (value) => {
      this.setState({
        authenticated: value
      });    
  }

   setProjectsOnState = (projects) => {
    this.setState({
      projects: projects
    });
   }

   setUserOnState = (user,id) => {
    this.setState({
      user:{...user, userID: id}
    });
   }

   setErrorOnState = (error) => {
    this.setState({
      error: error
    });
   }
   

   render() {
     console.log(this.state);

      return (
        <BrowserRouter>
          <div className="App">
            <Navbar setAuthenticatedOnState={this.setAuthenticatedOnState} setErrorOnState={this.setErrorOnState} appState={this.state} />
            <Route exact path='/' render={(routeProps) => (<Dashboard {...routeProps} appState={this.state}   setErrorOnState={this.setErrorOnState} setProjectsOnState={this.setProjectsOnState} />)}  />

            <Route path='/signin' render={(routeProps) => (<SignIn {...routeProps} appState={this.state} setAuthenticatedOnState={this.setAuthenticatedOnState} setErrorOnState={this.setErrorOnState} setProjectsOnState={this.setProjectsOnState} setUserOnState={this.setUserOnState} />)} />

            <Route path='/signup' render={(routeProps) => (<SignUp {...routeProps} appState={this.state} setAuthenticatedOnState={this.setAuthenticatedOnState} setErrorOnState={this.setErrorOnState} setProjectsOnState={this.setProjectsOnState} setUserOnState={this.setUserOnState} />)} />

            <Route path='/create' render={(routeProps) => (<CreateProject {...routeProps} appState={this.state} setErrorOnState={this.setErrorOnState} setProjectsOnState={this.setProjectsOnState} />)} />

            <Route path='/project/:id' render={(routeProps) => (<ProjectDetails {...routeProps} appState={this.state} setErrorOnState={this.setErrorOnState} setProjectsOnState={this.setProjectsOnState} />)} />
          </div>
        </BrowserRouter>
      );
   }
}

export default App;


// I M P O R T A N T                                                                                                 ------------------- If we don't sync authenticated value of App.js state with FIREBASE AUTH STATUS (which doesn't change even after refreshing the page or reopening the page after closing ), then authenticated value will be false for athenticated people after refreshing or reopening the page, means they will see sign in or sign up page only but still could priviledge all facilities of authentication like getting / reading projects from backend or Create / Post New Projects to the Backend, if they somehow send the request to backend / firebase. 
