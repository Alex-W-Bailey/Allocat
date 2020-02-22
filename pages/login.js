import React, { Component } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import RLLayout from "../components/RLLayout";
import FormMessage from "../components/FormMessage/index";
import { useRouter } from "next/router";
import Link from "next/link";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      pageTitle: "Login",
      menuItems: [
        { name: "Logout", href: "/", id: 1 },
        { name: "Projects", href: "/Projects", id: 2 }
      ],
      isError: false,
      errorMsg: "Email or Password incorrect"
    };
  }

  handleChange = e => {
    let objName = e.target.name;
    let objValue = e.target.value;

    this.setState({
      [objName]: objValue
    });
  };

  handleLoginClick = () => {
    console.log("clicked!");
    console.log(this.state);

    let user = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post("/api/login", user)
      .then(function(response) {
        if (response.status === 200) {
          window.location.replace("/projects");
        }
      })
      .catch(err => {
        if (err.response) {
          console.log("err");
          this.setState({
            isError: true
          });
        }
      });
  };

  render() {
    const isError = this.state.isError;

    const loginContainer = {
      padding: "40px",
      padding: "40px",
      border: "1px solid black",
      justifyContent: "center",
      height: "100vh",
      backgroundImage:
        "url('https://papers.co/wallpaper/papers.co-sh15-gray-dark-bw-black-gradation-blur-24-wallpaper.jpg')"
    };

    const loginInput = {
      paddingTop: "100px"
    };

    const allocatText = {
      textAlign: "center",
      color: "#2190cc",
      fontWeight: "bold"
    };

    const registerText = {
      color: "#2190cc",
      fontWeight: "bold",
      cursor: "pointer"
    };

    return (
      <div>
        <Nav
          pageTitle={this.state.pageTitle}
          menuItems={this.state.menuItems}
        />
        <RLLayout>
          <div className='row justify-center mx-auto'>
            <img src='/allocat_blue.png' className='big-cat' />
          </div>
          <h1 style={allocatText}>Allocat</h1>
          <div style={loginInput}>
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
              type='text'
              name='password'
              className='form-control'
              id='Password'
              placeholder='Password'
              onChange={this.handleChange.bind(this)}
            />
            <br />
            <div style={{ textAlign: "center" }}>
              <p>
                Don't have login?
                <Link href='/register'>
                  <p style={registerText}>Register</p>
                </Link>
              </p>
            </div>
            <button
              className='btn btn-primary'
              onClick={() => this.handleLoginClick()}
            >
              Login
            </button>

            <br />
          </div>
        </RLLayout>
      </div>
    );
  }
}
