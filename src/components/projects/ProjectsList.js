import React from 'react';

const ProjectList = (props) => {
    console.log(props.Projects.length);
    
      const getProjectList = () => {
        if(props.Projects.length !== 0){
          let projectsList = props.Projects.map( (Project) => {
            return (
              <div className="card z-depth-0 project-summary" key={Project.id}>
                <div className="card-content grey-text text-darken-3">
                  <span className="card-title ">{Project.title}</span>
                  <p>Posted by The Net Ninja</p>
                  <p className="grey-text">{Project.date.toLocaleString()}</p>
                </div>
              </div>
            );
          });
          return projectsList;
        } else {return <div><h4>No Project to Show</h4></div>}
      };
    

    return (
      <div className="project-list section">
        {getProjectList()}    
      </div>       
    );
    

}
export default ProjectList;