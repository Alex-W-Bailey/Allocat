import React, { Component } from "react";
import { Accordion, Card, Button, Form } from "react-bootstrap";
import NPLayout from "../NPLayout";

export default class DashboardTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewTeamForm: false,
      TaskName: "",
      TaskDescription: "",
      TaskTeam: "",
      TaskDueDate: "",
      allTeams: [],
      allTasks: [],
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
  };

  handleShowNewTeamForm = () => {
    this.state.showNewTeamForm
      ? this.setState({
          showNewTeamForm: false
        })
      : this.setState({ showNewTeamForm: true });
  };

  addNewTeam = () => {
    console.log("This will create a new team");
  };

  render() {
    if (this.state.showNewTeamForm === false) {
      return (
        <div className='mt-5'>
          <Button onClick={() => this.handleShowNewTeamForm()}>
            Add a New Team
          </Button>
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant='link' eventKey='0'>
                  Backend (Team 1)
                </Accordion.Toggle>
              </Card.Header>
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
                          Alex Baily
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey='0'>
                        <Card.Body>Passport.js</Card.Body>
                      </Accordion.Collapse>
                      <Accordion.Collapse eventKey='0'>
                        <Card.Body>Next.js</Card.Body>
                      </Accordion.Collapse>
                      <Accordion.Collapse eventKey='0'>
                        <Card.Body>Create Schema</Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant='link'
                          eventKey='1'
                        >
                          Rico Quintanilla
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey='1'>
                        <Card.Body>Routing</Card.Body>
                      </Accordion.Collapse>
                      <Accordion.Collapse eventKey='1'>
                        <Card.Body>Passport.js</Card.Body>
                      </Accordion.Collapse>
                      <Accordion.Collapse eventKey='1'>
                        <Card.Body>Next.js</Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant='link' eventKey='1'>
                  Frontend
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey='1'>
                <Card.Body>
                  <Accordion>
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant='link'
                          eventKey='0'
                        >
                          Danielle Burrage
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey='0'>
                        <Card.Body>SASS</Card.Body>
                      </Accordion.Collapse>
                      <Accordion.Collapse eventKey='0'>
                        <Card.Body>Projects Card</Card.Body>
                      </Accordion.Collapse>
                      <Accordion.Collapse eventKey='0'>
                        <Card.Body>Create Schema</Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant='link'
                          eventKey='1'
                        >
                          Monica Dixon
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey='1'>
                        <Card.Body>React.js</Card.Body>
                      </Accordion.Collapse>
                      <Accordion.Collapse eventKey='1'>
                        <Card.Body>Bootstrap-React</Card.Body>
                      </Accordion.Collapse>
                      <Accordion.Collapse eventKey='1'>
                        <Card.Body>Dashboard</Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      );
    } else {
      return (
        <div className='col-md-8 mt-5'>
          <div className='row'>
            <Button onClick={() => this.handleShowNewTeamForm()}>
              Back To Team Overview
            </Button>
          </div>
          <div className='row mt-3'>
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
              <Button onClick={() => this.addNewTeam()}>Create New Team</Button>
            </Form>
          </div>
        </div>
      );
    }
  }
}
