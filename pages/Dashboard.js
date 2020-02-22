// This will need to take in a Project Card Component and map out a card for each project in the database.
import Nav from "../components/Nav";
import React, { Component } from "react";
import { ListGroup, Button } from "react-bootstrap";
import Layout from "../components/Layout";
import DBLayout from "../components/DashboardLayout";
import axios from "axios";
import '../styles.scss';
import DashboardWindow from "../components/DashboardWindow";

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
  };

  render() {

    return (
      <div>
        <Layout>
          <Nav pageTitle={this.state.pageTitle} />
          <div className='row'>
            <div className='col-md-2 dashboard-menu verticle-align mt-5'>
              <ListGroup variant='flush' className='verticle-align'>
                <ListGroup.Item>
                  <Button className='pdash-nav' onClick={() => this.updateCategory("teams")}>
                    Teams
                    </Button>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button className='pdash-nav' onClick={() => this.updateCategory("tasks")}>
                    Tasks
                    </Button>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button className='pdash-nav' onClick={() => this.updateCategory("timeline")}>
                    Timeline
                    </Button>
                </ListGroup.Item>
              </ListGroup>
            </div>
            <div className='col-md-10'>
              <DBLayout>
                <DashboardWindow
                  categorySelected={this.state.categorySelected}
                  tasks={this.state.tasks}
                  teams={this.state.teams}
                  timeline={this.state.timeline}
                />
              </DBLayout>
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}
