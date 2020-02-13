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
          name: "Frontend",
          id: 1,
          collaborators: ["Danielle", "Monica"],
          tasks: ["Create React Components", "Add bootstrap", "Learn SASS"]
        },
        {
          name: "Backend",
          id: 2,
          collaborators: ["Rico", "Alex"],
          tasks: ["Implement Next.js", "Add Authentication", "Create Schema"]
        }
      ]
    };
  }

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
    // this.setState({ tasks: newTasks });
  };

  render() {
    return (
      <Layout>
        <Nav pageTitle={this.state.pageTitle} />
        <NPLayout>
          <FormNewProject
          // teams={this.state.teamName}
          // createProject={this.createProject}
          />
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

// console.log(this.state.teams[0]);
// if( this.state.teams && this.state.teams.length ){
//   return (
//       <Layout>
//         <Nav pageTitle={this.state.pageTitle} />
//         <FormNewProject />
//         <FormTeam
//           teams={this.state.teams}
//           project={this.state.projectTitle}
//         />
//       </Layout>
//   );

// }
// else if (this.state.teams.collaborators && this.state.teams.collaborators.length){
//   <FormTasks teams={this.state.teams} />
// }
