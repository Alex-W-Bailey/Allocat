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

    handleChange = (e) => {
        let objName = e.target.name;
        let objValue = e.target.value;

        this.setState({
            [objName]: objValue
        })
    }

    handleRegisterClick = () => {
        console.log("clicked!");
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <p>Login Form</p>
                <label htmlFor="Email">Email:</label>
                <input
                    type="text"
                    name="Email"
                    className="form-control"
                    id="Email"
                    placeholder="Email"
                    onChange={this.handleChange.bind(this)}
                />
                <br />
                <label htmlFor="Password">Password:</label>
                <input
                    type="text"
                    name="Password"
                    className="form-control"
                    id="Password"
                    placeholder="Password"
                    onChange={this.handleChange.bind(this)}
                />
                <br />

                <button onClick={() => this.handleRegisterClick()} >Login</button>
            </div>
        )
    }
};