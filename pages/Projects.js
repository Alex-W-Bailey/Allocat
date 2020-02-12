// This will need to take in a Project Card Component and map out a card for each project in the database.
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
      projects: []
    };
  }

  componentDidMount(){
    axios.get("/api/allProjects")
      .then((projectsFound) => {
        if(projectsFound.data.length > 0){
          this.setState({ projects: projectsFound});
          console.log(this.state);
        }
        else {
          console.log("No projects found...");
        }
      });
  }

      existingProjects: [
        {
          id: "1234",
          projectName: "Success!!!!",
          description: "Blahhh",
          dueDate: "Feb 29"
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <Layout>
          <Nav pageTitle={this.state.pageTitle} />
          <div className='container'>
            <div className='row'>
              <div className='col-md-12 mt-5'>
                <h5>
                  This is where the projects will go. There will be a card for
                  each one. Click the card and it takes you to the dashboard for
                  that Project
                </h5>
                <NPCard />
                {
                  this.state.existingProjects.map((project, i) => {
                    return (
                      <PCard
                        key={i}
                        id={project.id}
                        projectName={project.projectName}
                        description={project.description}
                        dueDate={project.description}
                      />
                    );
                  })
                }
              </div>
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}
