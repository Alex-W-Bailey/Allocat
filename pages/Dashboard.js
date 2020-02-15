// This will need to take in a Project Card Component and map out a card for each project in the database.
import Nav from "../components/Nav/index";
import React, { Component } from "react";
import { ListGroup, Button } from "react-bootstrap";
import Layout from "../components/Layout";
import DBLayout from "../components//DBLayout";
import axios from "axios";
import DashboardTasks from "../components/DashboardTasks";
import DashboardTeams from "../components/DashboardTeams";
import DashboardTimeline from "../components/DashboardTimeline";

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
          <div className=' mt-5'>
            <div className='row'>
              <div className='col-md-2 dashboard-menu verticle-align mt-5'>
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
              <div className='col-md-10 mt-5'>
                <DBLayout>
                  <DashboardTeams teams={this.state.teams} />
                  <DashboardTasks tasks={this.state.tasks} />
                  <DashboardTimeline timeline={this.state.timeline} />
                </DBLayout>
              </div>
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}
