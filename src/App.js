import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Dashboard from './components/dashboard/Dashboard'
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/projects/CreateProject';
import ProjectDetails from './components/projects/ProjectDetails';


//For developing app, firstly you can make the flow chart of components, then do the templating only of all the components(hardcoding all the content) and set all the corresponding routes, then check the app's working after adding dummy data to the state and syncing with the components' content to give UI according to the state. And then can remove dummy data and add backend into app with data coming from backend and syncing with the state to give UI accordingly. 

//If you think you can take project directly from the create project form to update state of App.js and post to the backend separately then may be it would lead faster update on UI but the state s not synced with backend. It means when refresh the page or close the window and again open the app, then you will not see the previously added projects even when they are present in the database, because the state will be the one as defined in the class not having the previously added projects as it is not synced with the backend / getting its data from backend. 


class App extends Component {
   state = {
     projects: [
       {title: 'Front End Development', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', date: new Date(), id: 1},
       {title: 'ReactJS Development', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', date: new Date(), id: 2},
       {title: 'Full Stack Development', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', date: new Date(), id: 3}]
   }
   addProject = (project) => {
     this.setState({
      projects: [...this.state.projects, project]
     });
     console.log(this.state);
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
