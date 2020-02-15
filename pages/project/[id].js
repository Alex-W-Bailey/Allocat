// This will need to take in a Project Card Component and map out a card for each project in the database.
import Nav from "../../components/Nav";
import React, { Component } from "react";
import { ListGroup, Button } from "react-bootstrap";
import Layout from "../../components/Layout";
import DBLayout from "../../components/DBLayout";
import axios from "axios";
import DashboardWindow from "../../components/DashboardWindow";

export default class Dashboard extends Component {
  // constructor(props) {
  //   super(props);
  state = {
    pageTitle: "BootCamp Project 3 (Project Title)",
    categorySelected: "",
    teams: [],
    tasks: [],
    timeline: []
  };
  // }

  componentDidMount() {
    // console.log("Will retrieve project info from database and update state.");
  }

  updateCategory = categoryName => {
    this.setState({ categorySelected: categoryName });
    console.log(this.state.categorySelected);
  };

  render() {
    return (
      <div>
        <Layout>
          <Nav pageTitle={this.state.pageTitle} />
          <div className=' mt-5'>
            <div className='row'>
              <div className='col-md-2 dashboard-menu verticle-align mt-5'>
                <ListGroup variant='flush' className='verticle-align'>
                  <ListGroup.Item>
                    <Button onClick={() => this.updateCategory("teams")}>
                      Teams
                    </Button>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button onClick={() => this.updateCategory("tasks")}>
                      Tasks
                    </Button>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button onClick={() => this.updateCategory("timeline")}>
                      Timeline
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </div>
              <DashboardWindow
                categorySelected={this.state.categorySelected}
                tasks={this.state.tasks}
                teams={this.state.teams}
                timeline={this.state.timeline}
              />
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}
