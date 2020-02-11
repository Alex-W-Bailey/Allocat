import React, { Component } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            fullName: "",
            password: ""
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

        let newUser = {
            email: this.state.email,
            fullName: this.state.fullName,
            password: this.state.password
        }

        axios.post("/api/newUser", newUser)
            .then(function(response){
                console.log("user added!");
            })
    } 

    render(){
        return (
            <Layout>
                <p>Register Form</p>
                <label htmlFor="FullName">Full Name:</label>
                <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    id="FullName"
                    placeholder="Full Name"
                    onChange={this.handleChange.bind(this)}
                />
                <br />
                <label htmlFor="Email">Email:</label>
                <input
                    type="text"
                    name="email"
                    className="form-control"
                    id="Email"
                    placeholder="Email"
                    onChange={this.handleChange.bind(this)}
                />
                <br />
                <label htmlFor="Password">Password:</label>
                <input
                    type="text"
                    name="password"
                    className="form-control"
                    id="Password"
                    placeholder="Password"
                    onChange={this.handleChange.bind(this)}
                />
                <br />

                <button onClick={() => this.handleRegisterClick()} >Register</button>
            </Layout>
        )
    }
};