import "../styles.scss";
import Nav from "../components/Nav";
import React, { Component } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import NPCard from "../components/NPCard";
import PCard from "../components/PCard";

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
          <div className="col-lg-12 container-main float-right">
            <div className="pt-4">
              <div className="row">
                <div className="col-8 my-2 pl-5">
                  <h5 className="project-header">Your Projects</h5>
                </div>
                <hr />
              </div>
              <div className='row m-2'>
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
          </div>
        </Layout>
      </div >
    );
  }
}
