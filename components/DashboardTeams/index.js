import React, { Component } from "react";
import { Accordion, Card, Button, Form } from "react-bootstrap";
import NPLayout from "../NPLayout";
import axios from "axios";

export default class DashboardTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewTeamForm: false,
      allTeams: [],
      allCollaborators: [],
      allTasks: [],
      newTeamAssign: "",
      newTeam: "",
      isError: false,
      errorMsg: ""
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

    await axios.get(`/api/allTeams/${splitUrl}`).then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        newArr.push(response.data[i].teamName);
      }
    })

    console.log(newArr)

    this.setState({
      allTeams: newArr
    });
  }

  async getAllCollaborators() {
    var url = window.location.href;
    var splitUrl = url.split("/")[4];

    var collabs = []

    this.setState({
      allCollaborators: []
    });

    await axios.get(`/api/allCollaborators/${splitUrl}`).then((response) => {
      console.log(response);

      for (var i = 0; i < response.data.length; i++) {
        collabs.push(response.data[i]);
      }
    })

    for (var i = 0; i < collabs.length; i++) {
      this.pushCollaborator(i, collabs[i])
    }
  }

  async pushCollaborator(i, collaborator) {
    var newArr = [];

    await axios.get(`/api/findUser/${collaborator.userId}`).then((res) => {
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
        teamName: collaborator.teamName,
      }

      newArr.push(collab);

      this.setState({
        allCollaborators: newArr
      });
    });
  }

  async getAllTasks() {
    var url = window.location.href;
    var splitUrl = url.split("/")[4];

    var newArr = [];

    await axios.get(`/api/allTasks/${splitUrl}`).then((response) => {
      console.log(response);
      for (var i = 0; i < response.data.length; i++) {
        console.log(response);
        newArr.push(response.data[i]);
      }

      console.log(newArr);
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

  addNewTeam = () => {
    var url = window.location.href;
    var splitUrl = url.split("/")[4];

    var newTeam = {
      projectId: splitUrl,
      teamName: this.state.newTeam 
    }

    axios.post("/api/addTeamToProject", newTeam).then(response => {
      console.log("team created...");

      this.getAllInfo();

      this.setState({
        showNewTeamForm: false
      });
    })
  };

  handleAssignTeam = (e) => {
    var url = window.location.href;
    var splitUrl = url.split("/")[4];

    var teamName = this.state.newTeamAssign;

    if(teamName === "none"){
      teamName = null
    }

    var userId = e.target.id;

    axios.put(`/api/newAssignTeam/${splitUrl}/${userId}/${teamName}`).then((response) => {
      console.log("updated collab team in db")
    });

    this.getAllInfo();
  }

  render() {
    if (this.state.showNewTeamForm === false) {
      return (
        <div className='mt-5'>
          <Button onClick={() => this.handleShowNewTeamForm()}>
            Add a New Team
          </Button>
          <Accordion>
            {
              this.state.allTeams.map(team => {
                return (
                  <div>
                    <Accordion>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant='link' eventKey='0'>
                            {
                              team === null ? (
                                <p>Unassigned</p>
                              ) : (
                                  <p>{team}</p>
                                )
                            }
                          </Accordion.Toggle>
                        </Card.Header>
                        <div>
                          {
                            this.state.allCollaborators.map(collab => {
                              return (
                                this.state.allCollaborators.length > 0 ? (
                                  collab.teamName === team ? (
                                    <Accordion.Collapse eventKey='0'>
                                      <Card.Body>
                                        <Accordion>
                                          <Card>
                                            <Card.Header>
                                              <Accordion.Toggle
                                                as={Button}
                                                variant='link'
                                                eventKey='0'
                                              >
                                                {collab.name}
                                              </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey='0'>
                                              <Card.Body>
                                                <p>Assign Collaborator To A Team</p>
                                                <Form.Group>
                                                  <Form.Control onChange={this.handleChange.bind(this)} as='select' name="newTeamAssign">
                                                    <option value="N/A" disabled selected>Select Team</option>
                                                    {
                                                      this.state.allTeams.map(team => {
                                                        return (
                                                          team === null ? (
                                                            <option value="none">None</option>
                                                          ) : (
                                                              <option value={team}>{team}</option>
                                                            )
                                                        );
                                                      })
                                                    }
                                                  </Form.Control>
                                                </Form.Group>
                                                <button id={collab.userId} onClick={(e) => this.handleAssignTeam(e)}>Assign to team</button>
                                              </Card.Body>
                                            </Accordion.Collapse>
                                            {
                                              this.state.allTasks.map(task => {
                                                return (
                                                  task.userId === collab.userId ? (
                                                    <Accordion.Collapse eventKey='0'>
                                                      <Card.Body>{task.taskName}</Card.Body>
                                                    </Accordion.Collapse>
                                                  ) : (
                                                      <></>
                                                    )
                                                )
                                              })
                                            }                                            
                                          </Card>
                                        </Accordion>
                                      </Card.Body>
                                    </Accordion.Collapse> 
                                  ) : (
                                      <p></p>
                                    )
                                ) : (
                                    <p>No Collaborators</p>
                                  )
                              )
                            })
                          }
                        </div>
                      </Card>
                    </Accordion>
                  </div>
                )
              })
            }
          </Accordion>
        </div>
      );
    } else {
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
    }
  }
}
