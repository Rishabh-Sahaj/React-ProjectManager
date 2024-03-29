import React from 'react';
import { Link } from 'react-router-dom';

const ProjectList = (props) => {
    
      const getProjectList = () => {
        const {projects} = props.appState;

        if(projects.length !== 0){
          let projectsList = projects.map( (project) => {
            console.log(project.date.toDate());
            return (
              <Link to={'project/'+project.id} key={project.id}>
                <div className="card z-depth-0 project-summary">
                  <div className="card-content grey-text text-darken-3">
                    <span className="card-title ">{project.title}</span>
                    <p>Posted by {project.authorFirstName + ' ' + project.authorLastName}</p>
                    {/* <p className="grey-text">{project.date}</p> */}
                  </div>
                </div>
              </Link>
            );
          });//map
          return projectsList;
        } else {return <div><h4>Loading Projects...</h4></div>}
      };
    

    return (
      <div className="project-list section">
        {getProjectList()}    
      </div>       
    );
    

}
export default ProjectList;