import Nav from "../components/Nav";
import React, { Component } from "react";
import Layout from "../components/Layout";
import NPLayout from "../components/NPLayout";
import axios from "axios";
import FormNewProject from "../components/FormNewProject";
import FormTeam from "../components/FormTeam";
import FormTasks from "../components/FormTasks";
import NewTeam from "../components/NewTeam";
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
      allTeams: []
      // teams: [
      //   {
      //     teamName: "Frontend",
      //     id: 1,
      //     collaborators: [
      //       { collabName: "Danielle", email: "danielle@danielle.com" },
      //       { collabName: "Monica", email: "monica@monica.com" }
      //     ],
      //     tasks: [
      //       {
      //         taskName: "Implement Bootstrap and Sass",
      //         description: "figure out how to work with Next.js and Bootstrap",
      //         priorityLevel: 1,
      //         dueDate: "02/29/20"
      //       },
      //       {
      //         taskName: "Another Task",
      //         description: "Something Else",
      //         priorityLevel: 2,
      //         dueDate: "02/20/20"
      //       },
      //       {
      //         taskName: "Implement Bootstrap and Sass",
      //         description: "figure out how to work with Next.js and Bootstrap",
      //         priorityLevel: 2,
      //         dueDate: "02/22/20"
      //       }
      //     ]
      //   },
      //   {
      //     teamName: "Backend",
      //     id: 1,
      //     collaborators: [
      //       { collabName: "Alex", email: "alex@alex.com" },
      //       { collabName: "rico", email: "rico@rico.com" }
      //     ],
      //     tasks: [
      //       {
      //         taskName: "Next.js Bootstrap and Sass",
      //         description: "figure out how to work with Next.js and Bootstrap",
      //         priorityLevel: 1,
      //         dueDate: "02/29/20"
      //       },
      //       {
      //         taskName: "Another Task",
      //         description: "Something Else",
      //         priorityLevel: 2,
      //         dueDate: "02/20/20"
      //       },
      //       {
      //         taskName: "MySql",
      //         description: "figure out how to work with Next.js and Bootstrap",
      //         priorityLevel: 2,
      //         dueDate: "02/22/20"
      //       }
      //     ]
      //   }
      // ]
    };
  }

  handleChange = e => {
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

    let newProject = {
      projectName: this.state.projectName,
      projectDescription: this.state.projectDescription,
      dueDate: this.state.dueDate
    };

    axios.post("/api/newProject", newProject).then(response => {
      if (response.data === "err") {
        console.log("project name already taken");
      } else {
        console.log("project created...");

        var newCreator = {
          projectName: this.state.projectName
        };

        axios.post("/api/projectCreator", newCreator).then(response => {
          for (var i = 0; i < this.state.allTeams.length; i++) {
            console.log("creating team...");

            var teamName = this.state.allTeams[i];

            let newTeam = {
              projectName: this.state.projectName,
              projectId: 0,
              teamName: teamName,
              teamPosition: i
            };

            axios.post("/api/newTeam", newTeam).then(response => {
              if (response) {
                console.log("New Team created!");
              }
            });
          }
        });
      }
    });
  };

  handleNewTeam = () => {
    var newArr = this.state.numberOfTeams;
    newArr.push(<NewTeam />);

    this.setState({
      numberOfTeams: newArr
    });
  }

  //Priority level 1: High, 2: Medium, 3: Low

  createProject = (newProjectTitle, newTeams) => {
    console.log("create project triggered");

    // This will be triggered by a click event in the FormTeam Component
    this.setState({ projectTitle: newProjectTitle, teams: newTeams });
  };

  createTeams = newTeams => {
    console.log("create project triggered" + newTeams);
  };
  createTasks = newTasks => {
    console.log("create Tasks triggered");
    //

    // this.setState({ tasks: newTasks });
  };

  finalizeProjectDetails = () => {
    console.log("finalize project details");
  };

  render() {
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
                  onChange={this.handleChange.bind(this)}
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
                  onChange={this.handleChange.bind(this)}
                />
                <br />
                {
                  this.state.numberOfTeams.map((team, index) => {
                    var i = parseInt(index);
                    var elementNum = i + 1;
                    
                    return (
                      <NewTeam 
                        elementNum={elementNum}
                        handleChange={this.handleChange.bind(this)}
                      />
                    )
                  })
                }
                <button type='button' onClick={() => this.handleNewTeam()}>
                  Add Another Team
                </button>
                <br />
                <button onClick={newProject => props.createProject}>
                  Continue on To Adding collaborators
                </button>
                <br />
                <button type='button' onClick={() => this.handleNewProject()}>
                  Create Project
                </button>
              </form>
            </div>
          </div>

          {/* <FormTeam
            teamObj={this.state.teams}
            project={this.state.'projectTitle'}
            createTeams={this.createTeams}
          />

          <FormTasks
            teamObj={this.state.teams}
            project={this.state.projectTitle}
            createTasks={this.createTasks}
          />
          <div className='row mx-auto'>
            <div className='col-md-1 mx-auto'>
              <Button className='mt-5 mb-5' onClick={() => this.createProject()}>Finished</Button>
            </div>
          </div> */}
        </NPLayout>
      </Layout>
    );
  }
}
