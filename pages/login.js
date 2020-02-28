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
          this.setState({
            isError: true
          });
        }
      });
  };

  render(props) {
    const isError = this.state.isError;
    const didRegister = this.props.didRegister;

    return (
      <div className='rl-body'>
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
            </div>
            <div className='row  mx-auto justify-center'>
              <button
                className='button50'
                onClick={() => this.handleLoginClick()}
              >
                Login
              </button>
            </div>
            <br />
            {didRegister ? (
              <FormMessage status='success' message='You can now login!' />
            ) : isError ? (
              <FormMessage status='error' message={this.state.errorMsg} />
            ) : (
              <></>
            )}
          </div>
        </RLLayout>
        <div className='sticky'></div>
      </div>
    );
  }
}
