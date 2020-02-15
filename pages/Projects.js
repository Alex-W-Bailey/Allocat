// This will need to take in a Project Card Component and map out a card for each project in the database.
import "../styles.scss";
import Nav from "../components/Nav/index";
import React, { Component } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import NPCard from "../components/NPCard/index";
import PCard from "../components/PCard/index";

export default class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "Projects",
      projects: [],
      projectInfo: [],
    };
  }

  componentDidMount() {
    var newArr = this.state.projects;

    axios.get("/api/allProjects").then(projectsFound => {
      if (projectsFound.data.length > 0) {
        for (var i = 0; i < projectsFound.data.length; i++) {
          newArr.push(projectsFound.data[i].id);
          this.setState({
            projects: newArr
          });

          this.getProjectInfo(i);
        }
      } else {
        console.log("No projects found...");
      }
    });
  }

  async getProjectInfo(i) {
    var newArr = this.state.projectInfo;

    await axios.get(`/api/project/${this.state.projects[i]}`).then((project) => {
      newArr.push(project.data);
      this.setState({
        projectInfo: newArr
      });
    });

    console.log(this.state);
  }

  render() {
    return (
      <div>
        <Layout>
          <Nav pageTitle={this.state.pageTitle} />
          <div className='container'>
            <div className="row mt-5">
              <h5>Your Projects</h5>
              <hr />
            </div>
            <div className='row m-3'>
              <NPCard />
              {
                this.state.projectInfo.map(project => {
                  return (
                    <PCard
                      key={project.id}
                      id={project.id}
                      projectName={project.projectName}
                      description={project.projectDescription}
                      dueDate={project.dueDate}
                    />
                  )
                })
              }
            </div>
          </div>
        </Layout>
      </div >
    );
  }
}
