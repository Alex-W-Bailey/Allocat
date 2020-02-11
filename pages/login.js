import React, { Component } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import Nav from "../components/Nav";
import RLLayout from "../components/RLLayout";

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      pageTitle: "Login",
      menuItem: ["something", "something2", "something3"]
    };
  }


  handleChange = e => {
    let objName = e.target.name;
    let objValue = e.target.value;

    this.setState({
      [objName]: objValue
    });
  };

    handleRegisterClick = () => {
        console.log("clicked!");
        console.log(this.state);

        let user = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post("/api/login", user)
            .then(function(response){
               if(response.status === 200) {
                   window.location.replace("/projects");
               }
            })
    }

    render() {
        return (
            <div>
        <Nav pageTitle={this.state.pageTitle} menuItem={this.state.menuItem} />
        <RLLayout>
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

          <button onClick={() => this.handleRegisterClick()}>Login</button>
        </RLLayout>
      </div>
    );
  }
}
