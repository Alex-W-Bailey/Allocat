import "../styles.scss";
import Nav from "../components/Nav";
import React, { Component } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import NPCard from "../components/NPCard";
import PCard from "../components/PCard";
import FormMessage from "../components/FormMessage";
import Link from "next/link";

export default class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      pageTitle: "Projects",
      menuItems: [
        { title: "Create a New Project", link: "/newProject", id: 2 },
        { title: "Notifications", link: "/notifications", id: 3 }
      ],
      projects: [],
      projectInfo: [],
      showNotificationsPage: false,
      hoveringNotification: false,
      userNotifications: [],
      isError: false,
      errorMsg: "",
      isSuccess: false,
      successMsg: ""
    };
  }

  componentDidMount() {
    var newArr = this.state.projects;

    axios.get("/api/allProjects").then(projectsFound => {
      if (projectsFound.data.length > 0) {
        for (var i = 0; i < projectsFound.data.length; i++) {
          newArr.push(projectsFound.data[i].projectId);
          this.setState({
            projects: newArr
          });

          this.getProjectInfo(i);
        }
      } else {
        console.log("No projects found...");
      }
    });

    this.getNotifications();

    axios.get("/api/findCurrentUser").then(response => {
      this.setState({
        user: response.data
      });
    });
  }

  async getNotifications() {
    this.setState({
      userNotifications: []
    });

    await axios.get("/api/getNotifications").then(response => {
      var notifications = [];

      if (response.data.length > 0) {
        for (var i = 0; i < response.data.length; i++) {
          notifications.push(response.data[i]);
        }
      }

      for (var i = 0; i < notifications.length; i++) {
        this.pushNotification(i, notifications[i]);
      }
    });
  }

  async pushNotification(i, notification) {
    var newArr = [];

    await axios.get(`/api/project/${notification.projectId}`).then(response => {
      axios.get(`/api/findUser/${notification.senderUserId}`).then(res => {
        var oldState = this.state.userNotifications;

        if (oldState.length > 0) {
          for (var j = 0; j < oldState.length; j++) {
            newArr.push(oldState[j]);
          }
        }

        var newNotification = {
          id: notification.id,
          projectId: notification.projectId,
          projectName: response.data.projectName,
          senderName: res.data.fullName
        };

        newArr.push(newNotification);

        this.setState({
          userNotifications: newArr
        });
      });
    });
  }

  async getProjectInfo(i) {
    var newArr = this.state.projectInfo;

    await axios.get(`/api/project/${this.state.projects[i]}`).then(project => {
      newArr.push(project.data);
      this.setState({
        projectInfo: newArr
      });
    });
  }

  toggleNotificationBtn() {
    var oppositeVal = !this.state.hoveringNotification;

    this.setState({
      hoveringNotification: oppositeVal
    });
  }

  showUserNotifications() {
    this.setState({
      showNotificationsPage: true
    });
  }

  hideUserNotifications() {
    this.setState({
      showNotificationsPage: false,
      userNotifications: 0
    });
  }

  async handleAcceptInvite(e) {
    var projectId = e.target.id;

    await axios.post(`/api/acceptInvite/${projectId}`).then(response => {
      if (response.status === 200) {
        axios.delete(`/api/deleteInvite/${projectId}`).then(res => {
          this.getNotifications();

          this.setState({
            isError: false,
            errorMsg: "",
            isSuccess: true,
            successMsg: "You joined the project"
          });
        });
      }
    });
  }

  async handleDeclineInvite(e) {
    var projectId = e.target.id;

    axios.delete(`/api/deleteInvite/${projectId}`).then(res => {
      this.getNotifications();

      this.setState({
        isError: true,
        errorMsg: "You declined the invite",
        isSuccess: false,
        successMsg: ""
      });
    });
  }

  render() {
    var notificationCircle;

    if (this.state.hoveringNotification) {
      notificationCircle = {
        borderRadius: "50%",
        width: "45px",
        height: "auto",
        padding: "8px",
        background: "#fa9a9a",
        border: "2px solid #ff0000",
        color: "#666",
        textAlign: "center",
        color: "white",
        fontSize: "20px",
        fontWeight: "bolder",
        outline: "none"
      };
    } else {
      notificationCircle = {
        borderRadius: "50%",
        width: "45px",
        height: "auto",
        padding: "8px",
        background: "#ff0000",
        border: "2px solid #ff0000",
        color: "#666",
        textAlign: "center",
        color: "white",
        fontSize: "20px",
        fontWeight: "bolder",
        outline: "none"
      };
    }

    var newNotificationCircle = {
      height: "15px",
      width: "35px",
      marginLeft: "15px",
      marginTop: "15px",
      paddingTop: "40px",
      backgroundColor: "#ff0000",
      borderRadius: "50%",
      display: "inline-block"
    };

    var isError = this.state.isError;
    var isSuccess = this.state.isSuccess;

    return (
      <Layout>
        <Nav
          pageTitle={this.state.pageTitle}
          menuItems={this.state.menuItems}
        />

        <div className='col-lg-12 container-main float-right'>
          <div className='pt-4'>
            <div className='row'>
              <div className='col-8 my-2 pl-5'>
                <h5 className='project-header'>
                  Your Projects
                  {this.state.userNotifications.length >= 1 ? (
                    <Link href='/notifications'>
                      <button
                        onMouseOver={() => this.toggleNotificationBtn()}
                        onMouseLeave={() => this.toggleNotificationBtn()}
                        style={notificationCircle}
                      >
                        {this.state.userNotifications.length}
                      </button>
                    </Link>
                  ) : (
                    <> </>
                  )}
                </h5>
              </div>
              <hr />
            </div>
            <div className='row m-2'>
              <NPCard />
              {this.state.projectInfo.map(project => {
                return (
                  <PCard
                    key={project.id}
                    id={project.id}
                    projectName={project.projectName}
                    description={project.projectDescription}
                    dueDate={project.dueDate}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
