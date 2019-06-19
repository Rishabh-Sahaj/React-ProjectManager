import React from 'react';
import { Link } from 'react-router-dom';

const ProjectList = (props) => {
    
      const getProjectList = () => {
        const {projects} = props;

        if(projects.length !== 0){
          let projectsList = projects.map( (project) => {
            return (
              <Link to={'project/'+project.id}>
                <div className="card z-depth-0 project-summary" key={project.id}>
                  <div className="card-content grey-text text-darken-3">
                    <span className="card-title ">{project.title}</span>
                    <p>Posted by The Net Ninja</p>
                    <p className="grey-text">{project.date.toLocaleString()}</p>
                  </div>
                </div>
              </Link>
            );
          });
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