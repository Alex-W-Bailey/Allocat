// This will need to take in a Project Card Component and map out a card for each project in the database.
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
            teams: [],
            tasks: [],
            timeline: []
        };
    }

    componentDidMount() {
        var url = window.location.href;
        var splitUrl = url.split("/")[4];    
        
        axios.get(`/api/project/${splitUrl}`).then((response) => {
            this.setState({
                pageTitle: response.data.projectName
            });
        });
    }

    updateCategory = categoryName => {
        this.setState({ categorySelected: categoryName });
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
