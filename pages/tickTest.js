import React, { Component } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import Nav from "../components/Nav";
import RLLayout from "../components/RLLayout";

export default class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        users: []
      }
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.getData(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    async getData() {
      var newArr = [];

      await axios.get("/api/allUsers").then((users) => {
        for(var i = 0; i < users.data.length; i++){
          newArr.push(users.data[i].email);
        }
      })

      this.setState({
        users: newArr
      })
    }
  
    render() {
      return (
        <div>
          {this.state.users.map(user => {
            return (
            <h1>{user}</h1>
            )
          })}
        </div>
      );
    }
  }