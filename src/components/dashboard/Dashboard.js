import React, { Component } from 'react';
import ProjectList from '../projects/ProjectsList';
import Notifications from './Notifications';

class Dashboard extends Component {

    render() {
      console.log(this.props);
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
export default Dashboard;