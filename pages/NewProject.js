import Nav from "../components/Nav";
import React, { Component } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "Create A New Project",
      numOfTeams: 1,
      teams: [],
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

          <div className='container'>
            <div className='row mt-5'>
              <div className='col-md-10 mx-auto'>
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

                  <button>Continue on To Adding collaborators</button>
                </form>
              </div>
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}
