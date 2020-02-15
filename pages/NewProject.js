import Nav from "../components/Nav/index";
import React, { Component } from "react";
import Layout from "../components/Layout/index";
import NPLayout from "../components/NPLayout/index";
import axios from "axios";
import FormNewProject from "../components/FormNewProject/index";
import FormTeam from "../components/FormTeam/index";
import FormTasks from "../components/FormTasks/index";
import NewTeam from "../components/NewTeam/index";
import NewCollaborator from "../components/NewCollaborator/index";
import { Button } from "react-bootstrap";

export default class NewProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageTitle: "Create A New Project",
      projectName: "",
      projectDescription: "",
      dueDate: "",
      numberOfTeams: [<NewTeam />],
      allTeams: [],
      searchedForCollaborator: false,
      collaboratorEmail: "",
      collaboratorFound: false,
      collaboratorName: "",
      allCollaborators: []
    };
  }

  handleChange = e => {
    let objName = e.target.name;
    let objValue = e.target.value;

    this.setState({
      [objName]: objValue
    });
  }

  handleTeamNameChange = e => {
    let objName = e.target.name;
    let objValue = e.target.value;

    if (objName.includes("teamName")) {
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
  };

  handleNewProject = () => {
    console.log("clicked!");
    console.log(this.state);

    this.createProject();
  };

  handleNewTeam = () => {
    var newArr = this.state.numberOfTeams;
    newArr.push(<NewTeam />);

    this.setState({
      numberOfTeams: newArr
    });
  }

  handleCollabSearch = () => {
    console.log("searching..." + this.state.collaboratorEmail);

    axios.get(`/api/user/${this.state.collaboratorEmail}`).then(usersFound => {
      if (usersFound.data != null) {
        this.setState({
          searchedForCollaborator: true,
          collaboratorFound: true,
          collaboratorName: usersFound.data.fullName
        });
      }
      else {
        console.log("none");
        this.setState({
          searchedForCollaborator: true,
          collaboratorFound: false
        });
      }

      console.log(this.state)
    });
  }

  handleAddNewCollaborator = () => {
    console.log("Add new collaborator");
    let collaboratorEmail = this.state.collaboratorEmail;

    var newArr = this.state.allCollaborators;
    newArr.push(collaboratorEmail);

    this.setState({
      allCollaborators: newArr,
      collaboratorEmail: ""
    });

    console.log(this.state);
  }

  //Priority level 1: High, 2: Medium, 3: Low

  async createProject() {
    let newProject = {
      projectName: this.state.projectName,
      projectDescription: this.state.projectDescription,
      dueDate: this.state.dueDate
    };

    await axios.post("/api/newProject", newProject).then(response => {
      if (response.data === "err") {
        console.log("project name already taken");
      } else {
        console.log("project created...");
      }
    });

    var newCreator = {
      projectName: this.state.projectName
    };

    await axios.post("/api/projectCreator", newCreator).then(response => {
      for (var i = 0; i < this.state.allTeams.length; i++) {
        console.log("creating team...");

        this.createTeams(i);
      }
    });

    await this.createCollaborators();

    console.log("project creation process completed...");
  }

  async createTeams(i) {
    var teamName = this.state.allTeams[i];

    let newTeam = {
      projectName: this.state.projectName,
      projectId: 0,
      teamName: teamName,
      teamPosition: i
    };

    console.log(newTeam);

    axios.post("/api/newTeam", newTeam).then(response => {
      if (response) {
        console.log("New Team created!");
      }
    });
  };

  async createCollaborators() {
    console.log("create collaborators")

    for (var i = 0; i < this.state.allCollaborators.length; i++) {
      var collaborator = this.state.allCollaborators[i];
      console.log("collab: " + collaborator);

      axios.post(`/api/newCollaborator/${collaborator}/${this.state.projectName}`).then((response) => {
        if (response.status === 200) {
          console.log("added collaborators");
        }
      })
    }
  }

  createTasks = newTasks => {
    console.log("create Tasks triggered");
    //

    // this.setState({ tasks: newTasks });
  };

  finalizeProjectDetails = () => {
    console.log("finalize project details");
  };

  render() {
    const searchedForCollaborator = this.state.searchedForCollaborator;
    const foundCollaborator = this.state.collaboratorFound;

    return (
      <Layout>
        <Nav pageTitle={this.state.pageTitle} />
        <NPLayout>
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
                  onChange={this.handleTeamNameChange.bind(this)}
                />
                <label htmlFor='ProjectDescription'>Project Description:</label>
                <input
                  type='text'
                  name='projectDescription'
                  className='form-control'
                  rows='5'
                  id='projectDescription'
                  placeholder='Project Description'
                  onChange={this.handleChange.bind(this)}
                />
                <label htmlFor='ProjectDescription'>Project Due Date:</label>
                <input
                  type='text'
                  name='projectDueDate'
                  className='form-control'
                  rows='5'
                  id='projectDueDate'
                  placeholder='02/29/20'
                  onChange={this.handleTeamNameChange.bind(this)}
                />
                <br />
                {
                  this.state.numberOfTeams.map((team, index) => {
                    var i = parseInt(index);
                    var elementNum = i + 1;

                    return (
                      <NewTeam
                        elementNum={elementNum}
                        handleChange={this.handleTeamNameChange.bind(this)}
                      />
                    )
                  })
                }
                <button type='button' onClick={() => this.handleNewTeam()}>
                  Add Another Team
                </button>
                <br />
                <NewCollaborator
                  value={this.state.collaboratorEmail}
                  handleChange={this.handleChange.bind(this)}
                />
                {
                  foundCollaborator ? (
                    <p>{this.state.collaboratorName}</p>
                  ) : searchedForCollaborator ? (
                    <p>No user found...</p>
                  ) : (
                        <p></p>
                      )
                }
                <button type="button" onClick={() => this.handleCollabSearch()}>
                  Search
                </button>
                <button type="button" onClick={() => this.handleAddNewCollaborator()}>
                  Add
                </button>
                <br />
                <br />

                <button type='button' onClick={() => this.handleNewProject()}>
                  Create Project
                </button>
              </form>
            </div>
          </div>
        </NPLayout>
      </Layout>
    );
  }
}
