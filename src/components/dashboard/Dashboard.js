import React, { Component } from 'react';
import ProjectList from '../projects/ProjectsList';
// import Notifications from './Notifications';
import { Redirect } from 'react-router-dom'; // For making people see the right routes according to thier authentication status . Also helps when people who try to access the route manually or through inspecting or by clicking links in the nav which they could display by manuplating the css or js.  This is ROUTE GUARDING.

class Dashboard extends Component {

    render() {
        const {authenticated} = this.props.appState;

        if(!authenticated) {
          return <Redirect to='/signin' />;// for people who try to access the route manually or through inspecting or by clicking links in the nav which they could display by manuplating the css or js.  
        }
        else {
          return (
            <div className="dashboard container">
              <div className="row">
                
                <div className="col s12 m10">
                  <ProjectList appState={this.props.appState}/>  
                </div>
                {/* <div className="col s12 m5 offset-m1">
                  <Notifications />  
                </div> */}
              
              </div>
            </div>
          );
        }
    }

}
export default Dashboard;