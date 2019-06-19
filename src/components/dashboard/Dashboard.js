import React, { Component } from 'react';
import ProjectList from '../projects/ProjectsList';
import Notifications from './Notifications';
import { Redirect } from 'react-router-dom'; // for people who try to access the route manually or through inspecting or by clicking links in the nav which they could display by manuplating the css or js.  

class Dashboard extends Component {

    render() {
        const {authenticated,projects} = this.props.appState;

        if(!authenticated) {
          return <Redirect to='/signin' />;// for people who try to access the route manually or through inspecting or by clicking links in the nav which they could display by manuplating the css or js.  
        }
        else {
          return (
            <div className="dashboard container">
              <div className="row">
                
                <div className="col s12 m6">
                  <ProjectList projects={projects}/>  
                </div>
                <div className="col s12 m5 offset-m1">
                  <Notifications />  
                </div>
              
              </div>
            </div>
          );
        }
    }

}
export default Dashboard;