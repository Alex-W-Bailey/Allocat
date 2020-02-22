// This will need to take in a Project Card Component and map out a card for each project in the database.
import '../../styles.scss';
import Nav from "../../components/Nav/index";
import React, { Component } from "react";
import { ListGroup, Button } from "react-bootstrap";
import Layout from "../../components/Layout";
import axios from "axios";
import DashboardWindow from "../../components/DashboardWindow";

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageTitle: "",
            categorySelected: "",
            teamNames: [],
            teamMembers: [],
            tasks: [],
            timeline: [],
            projectId: 0
        };
    }

    componentDidMount() {
        var url = window.location.href;
        var splitUrl = url.split("/")[4];

        this.setState({
            projectId: splitUrl
        });

        axios.get(`/api/project/${splitUrl}`).then((response) => {
            this.setState({
                pageTitle: response.data.projectName
            });
        });

        axios.get(`/api/allTeams/${splitUrl}`).then((response) => {
            var newArr = [];

            for (var i = 0; i < response.data.length; i++) {
                newArr.push(response.data[i])
            }

            this.setState({
                teamNames: newArr
            })
        })
    }

    updateCategory = categoryName => {
        this.setState({ categorySelected: categoryName });
    };

    render() {
        return (
            <div>
                <Layout>
                    <Nav pageTitle={this.state.pageTitle} />
                    <div class="row">
                        <div className="col-lg-2 dashboard-menu float-left">
                            <ListGroup variant="flush" className="verticle-align">
                                <ListGroup.Item>
                                    <Button onClick={() => this.updateCategory("teams")}>
                                        Teams
                                </Button>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button onClick={() => this.updateCategory("tasks")}>Tasks
                                </Button>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button onClick={() => this.updateCategory("timeline")}>Timeline
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                        <div className="col-lg-10 container-main-task float-right">
                            <div className="pt-4">
                                <div className="row">
                                    <div className="col-12 my-2 px-5">
                                        <h5 className="task-header">Your  {this.state.categorySelected}</h5>
                                        <hr></hr>
                                    </div>
                                    <hr />
                                </div>
                                <DashboardWindow
                                    categorySelected={this.state.categorySelected}
                                    tasks={this.state.tasks}
                                    teams={this.state.teams}
                                    timeline={this.state.timeline}
                                />
                            </div>
                        </div>
                    </div>
                </Layout>
            </div>
        );
    }
}
