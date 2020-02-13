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
      allTeams: []
    }
  }

  handleChange = (e) => {
    let objName = e.target.name;
    let objValue = e.target.value;

    if (objName.includes("TeamName")) {
      let getTeamNum = objName.slice(-1);
      let teamNum = parseInt(getTeamNum);

      //if there are any teams in the allTeams arr...
      if (this.state.allTeams.length >= teamNum) {
        //removes all characters in the objName so we get the team num
        let teamNum = parseInt(getTeamNum);
        console.log("replace teamNum Val");
        this.state.allTeams[teamNum - 1] = objValue;
      }
      //since there are no teams, just push to create one
      else {
        console.log("insert into the arr...");
        this.state.allTeams.push(objValue);
      }
    }
    //this is not a teamName object
    else {
      this.setState({
        [objName]: objValue
      });
    }
  }

  handleNewProject = () => {
    console.log("clicked!");
    console.log(this.state);

    let newProject = {
      projectName: this.state.projectName,
      projectDescription: this.state.projectDescription,
      dueDate: this.state.dueDate
    }

    axios.post("/api/newProject", newProject).then((response) => {
      if (response.data === "err") {
        console.log("project name already taken");
      }
      else {
        console.log("project created...");

        var newCreator = {
          projectName: this.state.projectName
        }

        axios.post("/api/projectCreator", newCreator).then((response) => {
          for (var i = 0; i < this.state.allTeams.length; i++) {
            console.log("creating team...");
  
            var teamName = this.state.allTeams[i];
  
            let newTeam = {
              projectName: this.state.projectName,
              projectId: 0,
              teamName: teamName,
              teamPosition: i
            }
  
            axios.post("/api/newTeam", newTeam).then((response) => {
              if (response) {
                console.log("New Team created!");
              }
            })
          }
        })
      }
    });
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