import React, { Component } from 'react'

class CreateProject extends Component {
  state = {
    title: '',
    content: '',
    date: null,
    id: null
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
      date: new Date(),
      id: Math.random()
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    console.log(this.props.addProject);
    this.props.addProject(this.state);
  }
  render() {
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Create a New Project</h5>
          <div className="input-field">
            <input type="text" id='title' onChange={this.handleChange}  required/>
            <label htmlFor="title">Project Title</label>
          </div>
          <div className="input-field">
            <textarea id="content" className="materialize-textarea" onChange={this.handleChange} required></textarea>
            <label htmlFor="content">Project Content</label>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">Create</button>
          </div>
        </form>
      </div>
    )
  }
}

export default CreateProject;
