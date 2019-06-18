import React, { Component } from 'react';
import ProjectList from '../projects/ProjectsList';
import Notifications from './Notifications';
import { Redirect } from 'react-router-dom'; // for people who try to access the route manually or through inspecting or by clicking links in the nav which they could display by manuplating the css or js.  

class Dashboard extends Component {

    render() {

        if(!this.props.auth) {
          return <Redirect to='/signin' />;// for people who try to access the route manually or through inspecting or by clicking links in the nav which they could display by manuplating the css or js.  
        }
        else {
          console.log(this.props.Projects);
          return (
            <div className="dashboard container">
              <div className="row">
                
                <div className="col s12 m6">
                  <ProjectList Projects={this.props.Projects}/>  
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