// This will need to take in a Project Card Component and map out a card for each project in the database.
import Nav from "../components/Nav";
import React, { Component } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import NPCard from "../components/NPCard";

export default class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "Projects",
      existingProjects: [
        {
          id: 12321,
          projectName: "Project 3",
          description: "Blahhhhhhhh",
          dueDate: "Feb 29"
        }
      ]
    };
  }

  // On page load, API Call to database to get a list of the projects.
  // setState() to include object of all all the existing projects
  // ID,

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
              </div>
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}
