import Nav from "../components/Nav";
import React, { Component } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import NPLayout from "../components/NPLayout";

export default class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "Create A New Project",
      numOfTeams: 1,
      teams: [
        { Frontend: ["Danielle", "Monica"] },
        { Backend: ["Rico", "Alex"] }
      ],
      collaborators: [],
      tasks: []
    };
  }

  handleChange = e => {
    let objName = e.target.name;
    let objValue = e.target.value;

    this.setState({
      [objName]: objValue
    });
  };

  handleRegisterClick = () => {
    console.log("clicked!");
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <Layout>
          <Nav pageTitle={this.state.pageTitle} />
          <NPLayout>
            <div className='container'>
              <div className='row mt-5'>
                <div className='col-md-12 mx-auto'>
                  <h2>Project Title and Teams</h2>
                  <form>
                    <label htmlFor='ProjectTitle'>Project Title:</label>
                    <input
                      type='text'
                      name='ProjectTitle'
                      className='form-control'
                      id='ProjectTitle'
                      placeholder='Project Title'
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
                  </form>
                </div>
              </div>
            </div>
          </NPLayout>
          <NPLayout>
            <div className='container'>
              <div className='row mt-5'>
                <div className='col-md-12 mx-auto'>
                  <h2>Team 1 Collaborators</h2>
                  <div className='row'>
                    <div className='col-md-8'>
                      <form>
                        <label htmlFor='Collaborator'>
                          Name of Collaborator:
                        </label>
                        <input
                          type='text'
                          name='Collaborator'
                          className='form-control'
                          id='Collaborator'
                          placeholder='Collaborator'
                        />
                        <br />
                        <button>Add Collaborator to Team 1</button>
                        <br />
                        <button>Continue on To Team 2</button>
                      </form>
                    </div>
                    <div className='col-md-4'>
                      <p>
                        This is where Team Member names will show up as you type
                        them in.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NPLayout>
          <NPLayout>
            <div className='container'>
              <div className='row mt-5'>
                <div className='col-md-12 mx-auto'>
                  <h2>Team 1 Collaborators</h2>
                  <div className='row'>
                    <div className='col-md-8'>
                      <form>
                        <label htmlFor='Collaborator'>
                          Name of Collaborator:
                        </label>
                        <input
                          type='text'
                          name='Collaborator'
                          className='form-control'
                          id='Collaborator'
                          placeholder='Collaborator'
                        />
                        <br />
                        <button>Add Collaborator to Team 2</button>
                        <br />
                        <button>Continue on To Adding Tasks</button>
                      </form>
                    </div>
                    <div className='col-md-4'>
                      <p>
                        This is where Team Member names will show up as you type
                        them in.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NPLayout>
          <NPLayout>
            <div className='container'>
              <div className='row mt-5'>
                <div className='col-md-12 mx-auto'>
                  <h2>Add Tasks for Team 1 to Complete</h2>

                  <div className='row'>
                    <div className='col-md-8'>
                      <form>
                        <label htmlFor='TaskName'>Name of Tasks: </label>
                        <input
                          type='text'
                          name='TaskName'
                          className='form-control'
                          id='TaskName'
                          placeholder='Task Name'
                        />
                        <br />
                        <label htmlFor='Collaborator'>
                          Description of Task:{" "}
                        </label>
                        <input
                          type='text'
                          name='TaskDescription'
                          className='form-control'
                          id='TaskDescription'
                          placeholder='Task Description'
                        />
                        <br />
                        <label htmlFor='Collaborator'>Due Date: </label>
                        <input
                          type='text'
                          name='Collaborator'
                          className='form-control'
                          id='Collaborator'
                          placeholder='Collaborator'
                        />
                        <br />
                        <label htmlFor='Priority'>
                          Priority Level: (eventually a dropdown){" "}
                        </label>
                        <input
                          type='text'
                          name='Priority'
                          className='form-control'
                          id='Priority'
                          placeholder='Priority'
                        />
                        <br />
                        <button>Add Task</button>
                        <br />
                        <button>Continue on To Team 2 Tasks</button>
                      </form>
                    </div>
                    <div className='col-md-4'>
                      <p>This is where Tasks will show up</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NPLayout>
        </Layout>
      </div>
    );
  }
}
