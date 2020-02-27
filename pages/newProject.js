import "../styles.scss";
import React, { Component } from "react";
import Layout from "../components/Layout/index";
import axios from "axios";
import NewTeam from "../components/NewTeam/index";
import NPForm from "../components/NPForm/index";
import CreatedProject from "../components/CreatedProject/index";
import Nav from "../components/Nav";
import { Button } from "react-bootstrap";

export default class NewProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageNum: 0,
      pageTitle: "Create A New Project",
      menuItems: [
        { title: "Your Projects", link: "/projects", id: 1 },
        { title: "Notifications", link: "/notifications", id: 3 }
      ],
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
      errorMsg: "",
      errorPage: 0,
      isSuccess: false,
      successMsg: "",
      successPage: 0
    };
  }

  handleChange = e => {
    let objName = e.target.name;
    let objValue = e.target.value;

    this.setState({
      [objName]: objValue
    });
  };

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
  };

  handleCollabSearch = () => {
    console.log("searching..." + this.state.collaboratorEmail);

    axios.get(`/api/user/${this.state.collaboratorEmail}`).then(usersFound => {
      if (usersFound.data != null) {
        this.setState({
          searchedForCollaborator: true,
          collaboratorFound: true,
          collaboratorName: usersFound.data.fullName
        });
      } else {
        console.log("none");
        this.setState({
          searchedForCollaborator: true,
          collaboratorFound: false
        });
      }

      console.log(this.state);
    });
  };

  handleAddNewCollaborator = () => {
    let collaboratorEmail = this.state.collaboratorEmail;

    if (collaboratorEmail == "") {
      this.setState({
        isError: true,
        errorMsg: "Collaborator email is required",
        errorPage: 2,
        isSuccess: false,
        successMsg: "",
        successPage: 0
      });
    }
    else if (collaboratorEmail.includes("@") === false) {
      this.setState({
        isError: true,
        errorMsg: "Email is invalid format. Ex: name@email.com",
        errorPage: 2,
        isSuccess: false,
        successMsg: "",
        successPage: 0
      });
    }
    else {
      axios.get(`/api/user/${collaboratorEmail}`).then(response => {
        if (response.data !== null) {
          var newArr = this.state.allCollaborators;
          newArr.push(collaboratorEmail);

          this.setState({
            allCollaborators: newArr,
            collaboratorEmail: "",
            isError: false,
            errorMsg: "",
            errorPage: 0,
            isSuccess: true,
            successMsg: "User invited to the project!",
            successPage: 2
          });
        } else {
          this.setState({
            isError: true,
            errorMsg: "No user found...",
            errorPage: 2,
            isSuccess: false,
            successMsg: "",
            successPage: 0
          });
        }
      });
    }
  };

  handleRedirectToProjects = () => {
    window.location.replace("/projects");
  };

  handleNextPage = () => {
    var pageNum = this.state.pageNum;

    if (pageNum < 3) {
      pageNum++;

      this.setState({
        pageNum: pageNum
      });
    }
  };

  handleLastPage = () => {
    var pageNum = this.state.pageNum;

    if (pageNum > 0) {
      pageNum--;

      this.setState({
        pageNum: pageNum
      });
    }
  };

  async createProject() {
    var isFormLeftEmpty = this.validateForm();

    if (isFormLeftEmpty === false) {
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
      });
    }
  }

  validateForm() {
    var isFormLeftEmpty = false;

    //Checks project info
    if (this.state.projectName === "") {
      isFormLeftEmpty = true;
      this.setErrorState(isFormLeftEmpty, "Project name is required!", 0);
    } else if (this.state.projectDescription === "") {
      isFormLeftEmpty = true;
      this.setErrorState(
        isFormLeftEmpty,
        "Project description is required!",
        0
      );
    }

    return isFormLeftEmpty;
  }

  setErrorState(isError, errorMsg, pageNum) {
    this.setState({
      pageNum: pageNum,
      isError: isError,
      errorMsg: errorMsg
    });
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
  }

  async createCollaborators() {
    console.log("create collaborators");

    for (var i = 0; i < this.state.allCollaborators.length; i++) {
      var collaborator = this.state.allCollaborators[i];
      console.log("collab: " + collaborator);

      axios
        .post(`/api/newInviteUser/${collaborator}/${this.state.projectName}`)
        .then(response => {
          if (response.status === 200) {
            console.log("invited collaborators");
          }
        });
    }
  }

  async getId() {
    await axios
      .get(`/api/project/name/${this.state.projectName}`)
      .then(response => {
        this.setState({
          projectId: response.data.id
        });

        console.log("retrieved id...");
        console.log(this.state);
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
        <Nav
          pageTitle={this.state.pageTitle}
          menuItems={this.state.menuItems}
        />
        {createdProject ? (
          <CreatedProject
            projectId={this.state.projectId}
            handleRedirectToProjects={this.handleRedirectToProjects}
          />
        ) : isError ? (
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
            isError={this.state.isError}
            errorMsg={this.state.errorMsg}
            errorPage={this.state.errorPage}
          />
        ) : (
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
                isError={this.state.isError}
                errorMsg={this.state.errorMsg}
                errorPage={this.state.errorPage}
                isSuccess={this.state.isSuccess}
                successMsg={this.state.successMsg}
                successPage={this.state.successPage}
              />
            )}
      </Layout>
    );
  }
}
