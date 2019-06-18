import React from 'react';
import { Link } from 'react-router-dom';

const ProjectList = (props) => {
    
      const getProjectList = () => {
        if(props.Projects.length !== 0){
          let projectsList = props.Projects.map( (Project) => {
            return (
              <Link to={'project/'+Project.id}>
                <div className="card z-depth-0 project-summary" key={Project.id}>
                  <div className="card-content grey-text text-darken-3">
                    <span className="card-title ">{Project.title}</span>
                    <p>Posted by The Net Ninja</p>
                    <p className="grey-text">{Project.date.toLocaleString()}</p>
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