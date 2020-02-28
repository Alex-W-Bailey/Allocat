import React, { Component } from "react";
import { Accordion, Card, Button, Form, ListGroup, Nav } from "react-bootstrap";
import FormMessage from "../FormMessage";
import NPLayout from "../NPLayout";
import axios from "axios";

export default class DashboardTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewTeamForm: false,
      showNewCollabForm: false,
      allTeams: [],
      allCollaborators: [],
      allCollaboratorTeams: [],
      allTasks: [],
      allTaskUserIDs: [],
      newTeamAssign: "",
      newTeam: "",
      newCollabEmail: "",
      newCollabTeam: "",
      isError: false,
      errorMsg: "",
      isSuccess: false,
      successMsg: "",
      currentTeam: null
    };
  }

  componentDidMount() {
    this.getAllInfo();
  }

  async getAllInfo() {
    await this.getAllTeams();
    await this.getAllCollaborators();
    await this.getAllTasks();
  }

  async getAllTeams() {
    var newArr = [null];

    var url = window.location.href;
    var splitUrl = url.split("/")[4];

    await axios.get(`/api/allTeams/${splitUrl}`).then(response => {
      for (var i = 0; i < response.data.length; i++) {
        newArr.push(response.data[i].teamName);
      }
    });

    console.log(newArr);

    this.setState({
      allTeams: newArr
    });
  }

  async getAllCollaborators() {
    var url = window.location.href;
    var splitUrl = url.split("/")[4];

    var collabs = [];

    this.setState({
      allCollaborators: []
    });

    await axios.get(`/api/allCollaborators/${splitUrl}`).then(response => {
      console.log(response);

      for (var i = 0; i < response.data.length; i++) {
        collabs.push(response.data[i]);
      }
    });

    for (var i = 0; i < collabs.length; i++) {
      this.pushCollaborator(i, collabs[i]);
    }
  }

  async pushCollaborator(i, collaborator) {
    var newArr = [];

    await axios.get(`/api/findUser/${collaborator.userId}`).then(res => {
      var oldState = this.state.allCollaborators;

      if (oldState.length > 0) {
        for (var j = 0; j < oldState.length; j++) {
          newArr.push(oldState[j]);
        }
      }

      var collab = {
        id: collaborator.id,
        userId: collaborator.userId,
        name: res.data.fullName,
        projectId: collaborator.projectId,
        teamName: collaborator.teamName
      };

      newArr.push(collab);

      if (this.state.allCollaboratorTeams.includes(collab.teamName) === false) {
        var newTeamArr = [];

        if (this.state.allCollaboratorTeams.length > 0) {
          for (var i = 0; i < this.state.allCollaboratorTeams.length; i++) {
            newTeamArr.push(this.state.allCollaboratorTeams[i]);
          }
        }

        newTeamArr.push(collab.teamName);

        this.setState({
          allCollaboratorTeams: newTeamArr
        });
      }

      this.setState({
        allCollaborators: newArr
      });
    });
  }

  async getAllTasks() {
    var url = window.location.href;
    var splitUrl = url.split("/")[4];

    var newArr = [];

    await axios.get(`/api/allTasks/${splitUrl}`).then(response => {
      console.log(response);
      for (var i = 0; i < response.data.length; i++) {
        newArr.push(response.data[i]);

        if (this.state.allTaskUserIDs.includes(response.data[i].userId) === false) {
          var newID = [];

          if (this.state.allTaskUserIDs.length > 0) {
            for (var j = 0; j < this.state.allTaskUserIDs.length; j++) {
              newID.push(this.state.allTaskUserIDs[j]);
            }
          }

          console.log(response.data[i].userId);
          newID.push(response.data[i].userId);

          this.setState({
            allTaskUserIDs: newID
          });
        }
      }

      this.setState({
        allTasks: newArr
      });
    });
  }

  handleChange = e => {
    let objName = e.target.name;
    let objValue = e.target.value;

    this.setState({
      [objName]: objValue
    });
  };

  handleShowNewTeamForm = () => {
    this.state.showNewTeamForm
      ? this.setState({
        showNewTeamForm: false
      })
      : this.setState({ showNewTeamForm: true });
  };

  handleShowNewCollabForm = () => {
    this.state.showNewCollabForm
      ? this.setState({
        showNewCollabForm: false
      })
      : this.setState({ showNewCollabForm: true });
  };

  addNewTeam = () => {
    var url = window.location.href;
    var splitUrl = url.split("/")[4];

    var newTeam = {
      projectId: splitUrl,
      teamName: this.state.newTeam
    };

    axios.post("/api/addTeamToProject", newTeam).then(response => {
      console.log("team created...");

      this.getAllInfo();

      this.setState({
        showNewTeamForm: false
      });
    });
  };

  handleAssignTeam = e => {
    var url = window.location.href;
    var splitUrl = url.split("/")[4];

    var teamName = this.state.newTeamAssign;

    if (teamName === "none") {
      teamName = null;
    }

    var userId = e.target.id;

    axios
      .put(`/api/newAssignTeam/${splitUrl}/${userId}/${teamName}`)
      .then(response => {
        console.log("updated collab team in db");
      });

    this.getAllInfo();
  };

  async addNewCollab() {
    var url = window.location.href;
    var projectId = url.split("/")[4];
    var collaboratorEmail = this.state.newCollabEmail;
    var collaboratorTeam = this.state.newCollabTeam;

    if (collaboratorTeam === "none") {
      collaboratorTeam = null
    }

    await axios.get(`/api/user/${collaboratorEmail}`).then(userFound => {
      if (userFound.data != null) {
        axios.get(`/api/getUserCollabInfo/${collaboratorEmail}/${projectId}`).then(res => {
          if (res.data === null) {
            axios.post(`/api/inviteUser/${collaboratorEmail}/${projectId}`).then(response => {
              if (response.status === 200) {
                this.setState({
                  isError: false,
                  errorMsg: "",
                  isSuccess: true,
                  successMsg: "Collaborator invited to project!"
                });
              }
              else {
                this.setState({
                  isError: true,
                  errorMsg: "Error. Try again",
                  isSuccess: false,
                  successMsg: ""
                });
              }
            })
          }
          else {
            this.setState({
              isError: true,
              errorMsg: "User already a collaborator",
              isSuccess: false,
              successMsg: ""
            });
          }
        });
      }
      else {
        this.setState({
          isError: true,
          errorMsg: "No user found",
          isSuccess: false,
          successMsg: ""
        });
      }
    })
  }

  viewTeamPage = (teamName) => {
    var newTeamName = Object.values(teamName)[0];

    this.setState({
      currentTeam: newTeamName
    })
  }

  render() {
    var isError = this.state.isError;
    var isSuccess = this.state.isSuccess;

    console.log(this.state)

    if (
      this.state.showNewTeamForm === false &&
      this.state.showNewCollabForm === false
    ) {
      return (
        <div style={{ height: "100%" }} className="mt-1">
          <div className="row">
            <div className='col-lg-3' style={{ height: "90vh" }}>
              <div>
                <Button className="team-toggle-nav w-75 align-center" onClick={() => this.handleShowNewTeamForm()}>
                  Add a New Team
              </Button>
                <Button className="team-toggle-nav w-75 align-center" onClick={() => this.handleShowNewCollabForm()}>
                  Add a Collaborator
              </Button>
                <Nav style={{ textAlign: "" }} className="flex-column">
                  {this.state.allTeams.map(team => {
                    return (
                      team === null ? (
                        <Nav.Link id="unassigned" className="team" onClick={() => this.viewTeamPage({ team })}>Unassigned</Nav.Link>
                      ) : (
                          <Nav.Link id={team} onClick={() => this.viewTeamPage({ team })} className="team">{team}</Nav.Link>
                        )
                    );
                  })}
                </Nav>
              </div>
            </div>
            <div className="col-lg-9" style={{ height: "90vh", backgroundColor: "rgb(227, 227, 227)", borderRadius: "25px" }}>
              <h1 style={{ textAlign: "center", paddingTop: "20px" }}>{
                this.state.currentTeam === null ? (
                  <p>Unassigned</p>
                ) : (
                    <p>{this.state.currentTeam}</p>
                  )
              }</h1>
              <hr />
              {
                this.state.allCollaboratorTeams.includes(this.state.currentTeam) ? (
                  this.state.allCollaborators.map(collab => {
                    return this.state.allCollaborators.length > 0 ? (
                      collab.teamName === this.state.currentTeam ? (
                        <div className="collab">
                          <div class="row">
                            <div className="col-lg-3">
                              <h5 className="collab-name">{collab.name} -</h5>
                            </div>
                            <div className="col-lg-3 allTasks">
                              <ul>
                                {
                                  this.state.allTaskUserIDs.includes(collab.userId) ? (
                                    this.state.allTasks.map(task => {
                                      return task.userId === collab.userId ? (
                                        <div>
                                          <li>{task.taskName}</li>
                                        </div>
                                      ) : (
                                          <></>
                                        );
                                    })
                                  ) : (
                                      <p>No current tasks</p>
                                    )
                                }
                              </ul>
                            </div>
                            <div className="col-lg-6 assign-to-team">
                              <Form.Group>
                                <p style={{ margin: "0" }}>Assign to a team</p>
                                <Form.Control style={{ width: "60%", display: "inline-block" }} onChange={this.handleChange.bind(this)} as='select' name='newTeamAssign'>
                                  <option value='N/A' disabled selected> Select Team </option>
                                  {this.state.allTeams.map(team => {
                                    return team === null ? (
                                      <option value={null}> None </option>
                                    ) : (
                                        <option value={team}>
                                          {team}
                                        </option>
                                      );
                                  })}
                                </Form.Control>
                                <button className="assign-team" id={collab.userId} onClick={e => this.handleAssignTeam(e)}>
                                  Assign
                              </button>
                              </Form.Group>
                            </div>
                          </div>
                        </div>
                      ) : (
                          this.state.currentTeam === null ? (
                            collab.teamName === "None" ? (
                              <div className="collab">
                                <div class="row">
                                  <div className="col-lg-3">
                                    <h5 className="collab-name">{collab.name} -</h5>
                                  </div>
                                  <div className="col-lg-3 allTasks">
                                    <ul>
                                      {
                                        this.state.allTaskUserIDs.includes(collab.userId) ? (
                                          this.state.allTasks.map(task => {
                                            return task.userId === collab.userId ? (
                                              <div>
                                                <li>{task.taskName}</li>
                                              </div>
                                            ) : (
                                                <></>
                                              );
                                          })
                                        ) : (
                                            <p>No current tasks</p>
                                          )
                                      }
                                    </ul>
                                  </div>
                                  <div className="col-lg-6 assign-to-team">
                                    <Form.Group>
                                      <p style={{ margin: "0" }}>Assign to a team</p>
                                      <Form.Control style={{ width: "60%", display: "inline-block" }} onChange={this.handleChange.bind(this)} as='select' name='newTeamAssign'>
                                        <option value='N/A' disabled selected> Select Team </option>
                                        {this.state.allTeams.map(team => {
                                          return team === null ? (
                                            <option value={null}> None </option>
                                          ) : (
                                              <option value={team}>
                                                {team}
                                              </option>
                                            );
                                        })}
                                      </Form.Control>
                                      <button className="assign-team" id={collab.userId} onClick={e => this.handleAssignTeam(e)}>
                                        Assign
                                  </button>
                                    </Form.Group>
                                  </div>
                                </div>
                              </div>
                            ) : (
                                <></>
                              )
                          ) : (
                              <></>
                            )
                        )
                    ) : (
                        <h1>No collaborators assigned to this team</h1>
                      )
                  })
                ) : (
                    <h5>No collaborators assinged to this team</h5>
                  )
              }
            </div>
          </div>
          <div>
          </div>
        </div >
      );
    } else if (this.state.showNewTeamForm === true) {
      return (
        <NPLayout>
          <div className='col-md-12'>
            <Button onClick={() => this.handleShowNewTeamForm()}>
              Back To Team Overview
            </Button>
          </div>
          <div className='row mt-3'>
            <div className='col-md-12 mx-auto'>
              <Form>
                <label htmlFor='newTeam'>Team Name:</label>
                <input
                  type='text'
                  name='newTeam'
                  className='form-control'
                  placeholder='Team Name'
                  onChange={this.handleChange.bind(this)}
                />
                <br />
                <Button onClick={() => this.addNewTeam()}>
                  Create New Team
                </Button>
              </Form>
            </div>
          </div>
        </NPLayout>
      );
    } else if (this.state.showNewCollabForm === true) {
      return (
        <NPLayout>
          <div className='col-md-12'>
            <Button onClick={() => this.handleShowNewCollabForm()}>
              Back To Team Overview
            </Button>
          </div>
          <div className='row mt-3'>
            <div className='col-md-12 mx-auto'>
              <Form>
                <label htmlFor='collaboratorEmail'>Collaborator Email:</label>
                <input
                  type='email'
                  name='newCollabEmail'
                  className='form-control'
                  id='collaboratorEmail'
                  placeholder='Collaborator Email'
                  onChange={this.handleChange.bind(this)}
                />
                <br />
                <Form.Group>
                  <Form.Label>
                    Select the team this collaborator will Work With
                  </Form.Label>
                  <Form.Control name="newCollabTeam" as='select' onChange={this.handleChange.bind(this)}>
                    {this.state.allTeams.map(team => {
                      if (team === null) {
                        return <option value="none">None</option>
                      }
                      else {
                        return <option>{team}</option>;
                      }
                    })}
                  </Form.Control>
                </Form.Group>
                <br />
                <Button className="w-100 align-center" onClick={() => this.addNewCollab()}>
                  Add Collaborator <i className="pl-1 fas fa-user-plus"></i>
                </Button>
                {
                  isError ? (
                    <FormMessage
                      status="error"
                      message={this.state.errorMsg}
                    />
                  ) : (
                      isSuccess ? (
                        <FormMessage
                          status="success"
                          message={this.state.successMsg}
                        />
                      ) : (
                          <></>
                        )
                    )
                }
              </Form>
            </div>
          </div>
        </NPLayout>
      );
    }
  }
}
