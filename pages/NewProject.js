import Nav from "../components/Nav";
import React, { Component } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import FormNewProject from "../components/FormNewProject";
import FormTeam from "../components/FormTeam";
import FormTasks from "../components/FormTasks";

export default class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "Create A New Project",
      projectTitle: "BootCamp Project",
      teams: ["Frontend", "Backend"]
      //   teams: [
      //     {
      //       name: "Frontend",
      //       collaborators: ["Danielle", "Monica"],
      //       tasks: ["Create React Components", "Add bootstrap", "Learn SASS"]
      //     },
      //     {
      //       name: "Backend",
      //       collaborators: ["Rico", "Alex"],
      //       tasks: ["Implement Next.js", "Add Authentication", "Create Schema"]
      //     }
      //   ]
    };
  }

  handleChange = e => {
    let objName = e.target.name;
    let objValue = e.target.value;

    this.setState({
      [objName]: objValue
    });
  };

  render() {
    return (
      <div>
        <Layout>
          <Nav pageTitle={this.state.pageTitle} />
          <FormNewProject />
          <FormTeam
            teams={this.state.teams}
            project={this.state.projectTitle}
          />
          <FormTasks teams={this.state.teams} />
        </Layout>
      </div>
    );
  }
}
