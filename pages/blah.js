import React, { Component } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Email: "",
            Password: ""
        };
    }

    render() {
        return (
            <div>
                <h1>HELLO WORLD</h1>
            </div>
        )
    }
};