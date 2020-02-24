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
          <div class='row justify-center mx-auto'>
            <h1 className='blue-text'>Allocat</h1>
          </div>
          <div>
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
            <div className='row mx-auto justify-center'>
              <p class='text-center'>
                Don't have an account?
                <Link href='/register'>
                  <p className='blue-text pointer'>Register</p>
                </Link>
              </p>
              <button
                className='button50'
                onClick={() => this.handleLoginClick()}
              >
                Login
              </button>
            </div>

            <br />
          </div>
        </RLLayout>
      </div>
    );
  }
}
