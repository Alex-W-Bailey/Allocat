// This will need to take in a Project Card Component and map out a card for each project in the database.
import Nav from "../components/Nav";
import React, { Component } from "react";
import { ListGroup, Button } from "react-bootstrap";
import Layout from "../components/Layout";
import DBLayout from "../components//DBLayout";
import axios from "axios";
import DashboardTasks from "../components/DashboardTasks";
import DashboardTeams from "../components/DashboardTeams";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "BootCamp Project 3 (Project Title)",
      categorySelected: 1,
      teams: [],
      tasks: [],
      timeline: []
    };
  }

  componentDidMount() {
    console.log("Will retrieve project info from database and update state.");
  }

  render() {
    return (
      <div>
        <Layout>
          <Nav pageTitle={this.state.pageTitle} />
          <DBLayout>
            <div className='container mt-5'>
              <div className='row'>
                <div className='col-md-3 dashboard-menu verticle-align mt-5'>
                  <ListGroup variant='flush' className='verticle-align'>
                    <ListGroup.Item>
                      <Button>Teams</Button>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button>Tasks</Button>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button>Timeline</Button>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
                <div className='col-md-9 mt-5'>
                  <DashboardTasks />
                  <DashboardTeams />
                </div>
              </div>
            </div>
          </DBLayout>
        </Layout>
      </div>
    );
  }
}
