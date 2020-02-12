import React, { Component } from "react";
import NPLayout from "../components/NPLayout";
import axios from "axios";

// pass through a function that is triggered by click event. Function updates State with Project Title and Teams

export default class FormNewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      projectDescription: "",
      dueDate: "",
    }
  }

  handleChange = (e) => {
    let objName = e.target.name;
    let objValue = e.target.value;  
  
    this.setState({
      [objName]: objValue
    });
  }

  handleNewProject = () =>{
    console.log("clicked!");
    console.log(this.state);

    let newProject = {
      projectName: this.state.projectName,
      projectDescription: this.state.projectDescription,
      dueDate: this.state.dueDate
    }

    axios.post("/api/newProject", newProject).then((response) => {
      if(response.data === "err"){
        console.log("project name already taken");
      }
      else {
        console.log("project created...");
      }
    })
  }

  render() {
    return (
      <NPLayout>
        <div className='container'>
          <div className='row mt-5'>
            <div className='col-md-12 mx-auto'>
              <h2>Project Title and Teams</h2>
              <form>
                <label htmlFor='projectName'>Project Title:</label>
                <input
                  type='text'
                  name='projectName'
                  className='form-control'
                  id='projectName'
                  placeholder='Project Title'
                  onChange={this.handleChange.bind(this)}
                />
                <label htmlFor='ProjectDescription'>Project Description:</label>
                <input
                  type='text'
                  name='projectDescription'
                  className='form-control'
                  rows="5"
                  id='projectDescription'
                  placeholder='Project Description'
                  onChange={this.handleChange.bind(this)}
                />
                <br />
                <label htmlFor='TeamName1'>Team Name 1:</label>
                <input
                  type='text'
                  name='TeamName1'
                  className='form-control'
                  id='TeamName1'
                  placeholder='Team Name 1'
                  onChange={this.handleChange.bind(this)}
                />
                <br />
                <label htmlFor='TeamName2'>Team Name 2:</label>
                <input
                  type='text'
                  name='TeamName2'
                  className='form-control'
                  id='TeamName2'
                  placeholder='Team Name 2'
                  onChange={this.handleChange.bind(this)}
                />
                <br />
                <button>Continue on To Adding collaborators</button>
                <br />
                <button type="button" onClick={() => this.handleNewProject()}>Create Project</button>
              </form>
            </div>
          </div>
        </div>
      </NPLayout>
    );
  }
};