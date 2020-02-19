import React, { Component } from "react";
import Layout from "../components/Layout/index";
import axios from "axios";
import FormNewProject from "../components/FormNewProject/index";
import FormTeam from "../components/FormTeam/index";
import FormTasks from "../components/FormTasks/index";
import NewTeam from "../components/NewTeam/index";
import NewCollaborator from "../components/NewCollaborator/index";
import NPForm from "../components/NPForm/index";
import CreatedProject from "../components/CreatedProject/index"
import { Button } from "react-bootstrap";

export default class NewProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageNum: 0,
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
      allCollaborators: [],
      projectId: 0,
      projectCreatedSuccessfully: false,
      isError: false,
      errorMsg: ""
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

  handleRedirectToProjects = () => {
    window.location.replace("/projects");
  }

  handleNextPage = () => {
    var pageNum = this.state.pageNum;

    if(pageNum < 3){
      pageNum++;

      this.setState({
        pageNum: pageNum
      });
    }
  }

  handleLastPage = () => {
    var pageNum = this.state.pageNum;

    if(pageNum > 0){
      pageNum--;

      this.setState({
        pageNum: pageNum
      });
    }
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

        this.getId();
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
    
    this.setState({
      projectCreatedSuccessfully: true
    })
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

  async getId(){
    await axios.get(`/api/project/name/${this.state.projectName}`).then((response) => {
      this.setState({
        projectId: response.data.id
      });

      console.log("retrieved id...")
      console.log(this.state)
    });
  }

  render() {
    const searchedForCollaborator = this.state.searchedForCollaborator;
    const foundCollaborator = this.state.collaboratorFound;
    const createdProject = this.state.projectCreatedSuccessfully;
    const isError = this.state.isError;
    const errorMsg = this.state.errorMsg;

    return (
      <Layout>
        {
          createdProject ? (
            <CreatedProject 
              projectId={this.state.projectId}
              handleRedirectToProjects={this.handleRedirectToProjects}
            />
          ) : isError ?  (
            <NPForm
              pageNum={this.state.pageNum}
              pageTitle={this.state.pageTitle}
              collaboratorEmail={this.state.collaboratorEmail}
              collaboratorName={this.state.collaboratorName}
              handleChange={this.handleChange}
              handleTeamNameChange={this.handleTeamNameChange}
              numberOfTeams={this.state.numberOfTeams}
              handleNewTeam={this.handleNewTeam}
              handleCollabSearch={this.handleCollabSearch}
              handleAddNewCollaborator={this.handleAddNewCollaborator}
              handleNewProject={this.handleNewProject}
              foundCollaborator={foundCollaborator}
              searchedForCollaborator={searchedForCollaborator}
              handleNextPage={this.handleNextPage}
              handleLastPage={this.handleLastPage}
              isError={isError}
              errorMsg={errorMsg}
            />) : (
                <NPForm
                pageNum={this.state.pageNum}
                  pageTitle={this.state.pageTitle}
                  collaboratorEmail={this.state.collaboratorEmail}
                  collaboratorName={this.state.collaboratorName}
                  handleChange={this.handleChange}
                  handleTeamNameChange={this.handleTeamNameChange}
                  numberOfTeams={this.state.numberOfTeams}
                  handleNewTeam={this.handleNewTeam}
                  handleCollabSearch={this.handleCollabSearch}
                  handleAddNewCollaborator={this.handleAddNewCollaborator}
                  handleNewProject={this.handleNewProject}
                  foundCollaborator={foundCollaborator}
                  searchedForCollaborator={searchedForCollaborator}
                  handleNextPage={this.handleNextPage}
                  handleLastPage={this.handleLastPage}
                  isError={isError}
                  errorMsg={errorMsg}
                />
              )
        }

      </Layout>
    );
  }
}
