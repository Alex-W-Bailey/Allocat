// This will need to take in a Project Card Component and map out a card for each project in the database.
import Nav from "../components/Nav";
import React, { Component } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "Projects"
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
              </div>
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}
