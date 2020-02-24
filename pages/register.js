import React, { Component } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import Nav from "../components/Nav/index";
import RLLayout from "../components/RLLayout";
import FormMessage from "../components/FormMessage/index";
import { useRouter } from "next/router";
import Link from "next/link";
import "../styles.scss";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "Register",
      menuItem: ["something", "something2", "something3"],
      email: "",
      fullName: "",
      password: "",
      confPassword: "",
      isError: false,
      errorMsg: ""
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

    let newUser = {
      email: this.state.email,
      fullName: this.state.fullName,
      password: this.state.password
    };

    if (this.state.fullName === "") {
      this.setError(true, "Name is required");
    } else if (this.state.email === "") {
      this.setError(true, "Email is required");
    } else if (this.state.password === "") {
      this.setError(true, "Password is required");
    } else if (this.state.confPassword === "") {
      this.setError(true, "Confirmation Password is required");
    } else if (this.state.password !== this.state.confPassword) {
      this.setError(true, "Passwords don't match");
    } else {
      axios.post("/api/newUser", newUser).then(response => {
        if (response.data !== "email is already taken") {
          if (response.status === 200) {
            window.location.replace("/");
          }
        } else {
          this.setError(true, "Email is already registered");
        }
      });
    }
  };

  setError(isThereAnError, newErrorMsg) {
    this.setState({
      isError: isThereAnError,
      errorMsg: newErrorMsg
    });
  }

  render() {
    var isError = this.state.isError;
    console.log(this.state);

    const registerContainer = {
      padding: "40px",
      padding: "40px",
      justifyContent: "center"
    };

    // const registerText = {
    //   color: "#2190cc",
    //   fontWeight: "bold",
    //   cursor: "pointer"
    // };

    return (
      <Layout>
        <Nav pageTitle={this.state.pageTitle} menuItem={this.state.menuItem} />
        <div style={registerContainer}>
          <RLLayout>
            <div className='row justify-center mx-auto'>
              <img src='/allocat_blue.png' className='big-cat' />
            </div>
            <h1>Allocat</h1>

            <div>
              <label htmlFor='FullName'>Full Name:</label>
              <input
                type='text'
                name='fullName'
                className='form-control'
                id='FullName'
                placeholder='Full Name'
                onChange={this.handleChange.bind(this)}
              />
              <br />
              <label htmlFor='Email'>Email:</label>
              <input
                type='text'
                name='email'
                className='form-control'
                id='Email'
                placeholder='Email'
                onChange={this.handleChange.bind(this)}
              />
              <br />
              <label htmlFor='Password'>Password:</label>
              <input
                type='password'
                name='password'
                className='form-control'
                id='Password'
                placeholder='Password'
                onChange={this.handleChange.bind(this)}
              />
              <br />
              <label htmlFor='confPassword'>Confirm Password:</label>
              <input
                type='password'
                name='confPassword'
                className='form-control'
                id='confPassword'
                placeholder='Confirm Password'
                onChange={this.handleChange.bind(this)}
              />
              <div style={{ textAlign: "center" }}>
                <p>
                  Already have an account?
                  <Link href='/'>
                    <p>Login</p>
                  </Link>
                </p>
              </div>
              <button
                className='btn btn-primary'
                onClick={() => this.handleRegisterClick()}
              >
                Register
              </button>
              {isError ? (
                <FormMessage status='error' message={this.state.errorMsg} />
              ) : (
                <FormMessage />
              )}
            </div>
          </RLLayout>
        </div>
      </Layout>
    );
  }
}
