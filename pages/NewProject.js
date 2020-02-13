import Nav from "../components/Nav";
import React, { Component } from "react";
import Layout from "../components/Layout";
import NPLayout from "../components/NPLayout";
import axios from "axios";
import FormNewProject from "../components/FormNewProject";
import FormTeam from "../components/FormTeam";
import FormTasks from "../components/FormTasks";
import { Button } from "react-bootstrap";

export default class NewProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageTitle: "Create A New Project",
      projectTitle: "BootCamp Project",
      teams: [
        {
          teamName: "Frontend",
          id: 1,
          collaborators: [
            { colabName: "Danielle", email: "danielle@danielle.com" },
            { colabName: "Monica", email: "monica@monica.com" }
          ],
          tasks: [
            {
              taskName: "Implement Bootstrap and Sass",
              description: "figure out how to work with Next.js and Bootstrap",
              priorityLevel: 1,
              dueDate: "02/29/20"
            },
            {
              taskName: "Another Task",
              description: "Something Else",
              priorityLevel: 2,
              dueDate: "02/20/20"
            },
            {
              taskName: "Implement Bootstrap and Sass",
              description: "figure out how to work with Next.js and Bootstrap",
              priorityLevel: 2,
              dueDate: "02/22/20"
            }
          ]
        },
        {
          teamName: "Backend",
          id: 1,
          collaborators: [
            { colabName: "Alex", email: "alex@alex.com" },
            { colabName: "rico", email: "rico@rico.com" }
          ],
          tasks: [
            {
              taskname: "Next.js Bootstrap and Sass",
              description: "figure out how to work with Next.js and Bootstrap",
              priorityLevel: 1,
              dueDate: "02/29/20"
            },
            {
              taskname: "Another Task",
              description: "Something Else",
              priorityLevel: 2,
              dueDate: "02/20/20"
            },
            {
              taskName: "MySql",
              description: "figure out how to work with Next.js and Bootstrap",
              priorityLevel: 2,
              dueDate: "02/22/20"
            }
          ]
        }
      ]
    };
  }

  //Priority level 1: High, 2: Medium, 3: Low

  createProject = (newProjectTitle, newTeams) => {
    console.log("create project triggered");

    // This will be triggered by a click event in the FormTeam Component
    //
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
          <FormNewProject />
          <FormTeam
            teamObj={this.state.teams}
            project={this.state.projectTitle}
            createTeams={this.createTeams}
          />

          <FormTasks
            teamObj={this.state.teams}
            project={this.state.projectTitle}
            createTasks={this.createTasks}
          />
          <div className='row mx-auto'>
            <div className='col-md-1 mx-auto'>
              <Button className='mt-5 mb-5'>Finished</Button>
            </div>
          </div>
        </NPLayout>
      </Layout>
    );
  }
}
