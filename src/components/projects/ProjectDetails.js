import React from 'react';
import { Redirect } from 'react-router-dom';

const ProjectDetails = (props) => {
    const id = props.match.params.id;

    const {authenticated, projects} = props.appState;

    if(!authenticated) {
      return <Redirect to='/signin' />;
    }
    else {

      const Project = projects.find((project) => {
        return project.id === id;
      });

      if (Project) {
        return (
          <div className="container section project-details">
            <div className="card z-depth-0">
              <div className="card-content">
                <span className="card-title">{ Project.title }</span>
                <p>{ Project.content }</p>
              </div>
              <div className="card-action grey lighten-4 grey-text">
                <div>Posted by {Project.authorFirstName + ' ' + Project.authorLastName}</div>
                {/* <div>2nd September, 2am</div> */}
              </div>
            </div>
          </div>
        );
      } else {
        return (
        <div className="container center">
          <p>Loading project...</p>
        </div>
      );
    }
    }
}

export default ProjectDetails;