import TeamCard from "../components/TeamCard/TeamCard";
import Layout from "../components/Layout/index";
import Nav from "../components/Nav/index";
import '../styles.scss';

import React, { Component } from "react";

export default class TeamsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageTitle: "Teams",
            projectTeams: [
                {
                    teamName: "Watching The Wire",
                    progress: "On TV"
                }
            ]
        }
    }

    render() {
        return (
            <div>
                <Layout>
                    <Nav />
                    <container>
                        {
                            this.state.projectTeams.map((project, i) => {
                                return (
                                    <TeamCard teamName={project.teamName} progress={project.progress} />
                                );
                            })
                        }
                    </container>
                </Layout>
            </div>

        )
    }
}



