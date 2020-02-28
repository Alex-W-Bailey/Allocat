import "../styles.scss";
import Nav from "../components/Nav";
import React, { Component } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import FormMessage from "../components/FormMessage";

export default class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      pageTitle: "Notifications",
      userNotifications: [],
      menuItems: [
        { title: " Your Projects", link: "/projects", id: 1 },
        { title: "Create a New Project", link: "/newProject", id: 2 }
      ],
      isError: false,
      errorMsg: "",
      isSuccess: false,
      successMsg: ""
    };
  }
  componentDidMount() {
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
    var isError = this.state.isError;
    var isSuccess = this.state.isSuccess;

    return (
      <Layout>
        <Nav
          pageTitle={this.state.pageTitle}
          menuItems={this.state.menuItems}
        />
        {
          <div className='col-lg-12 container-main float-right'>
            <div className='pt-4'>
              <div className='row'>
                <div className='col-8 my-2 pl-5'>
                  <h5 className='project-header'>Your Notifications</h5>
                  <div style={{ textAlign: "center" }}>
                    {isError ? (
                      <FormMessage
                        status='error'
                        message={this.state.errorMsg}
                      />
                    ) : isSuccess ? (
                      <FormMessage
                        status='success'
                        message={this.state.successMsg}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <hr />
              </div>
              <div className='row m-2'>
                {this.state.userNotifications.length >= 1 ? (
                  this.state.userNotifications.map(noti => {
                    return (
                      <div
                        style={{
                          backgroundColor: "#f8f8f6",
                          margin: "30px",
                          height: "200px",
                          width: "100%",
                          borderRadius: "25px"
                        }}
                      >
                        <h5
                          style={{
                            display: "inline-block",
                            marginLeft: "8px",
                            marginBottom: "5px",
                            fontWeight: "bolder",
                            padding: "20px"
                          }}
                        >
                          New Project Invite
                        </h5>
                        <hr />
                        <div style={{ textAlign: "center" }}>
                          <h3>
                            {noti.senderName} invited you to join a project
                            named {noti.projectName}
                          </h3>
                          <button
                            id={noti.projectId}
                            onClick={e => this.handleAcceptInvite(e)}
                          >
                            Accept Invite
                          </button>
                          <button
                            id={noti.projectId}
                            onClick={e => this.handleDeclineInvite(e)}
                          >
                            Decline Invite
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>No notifications right now. Check back soon</div>
                )}
              </div>
            </div>
          </div>
        }
      </Layout>
    );
  }
}

// {
//   this.state.userNotifications.map(noti => {
//     return (
//       <div
//         style={{
//           backgroundColor: "#f8f8f6",
//           margin: "30px",
//           height: "200px",
//           width: "100%",
//           borderRadius: "25px"
//         }}
//       >
//         <h5
//           style={{
//             display: "inline-block",
//             marginLeft: "8px",
//             marginBottom: "5px",
//             fontWeight: "bolder",
//             padding: "20px"
//           }}
//         >
//           New Project Invite
//         </h5>
//         <hr />
//         <div style={{ textAlign: "center" }}>
//           <h3>
//             {noti.senderName} invited you to join a project named{" "}
//             {noti.projectName}
//           </h3>
//           <button id={noti.projectId} onClick={e => this.handleAcceptInvite(e)}>
//             Accept Invite
//           </button>
//           <button
//             id={noti.projectId}
//             onClick={e => this.handleDeclineInvite(e)}
//           >
//             Decline Invite
//           </button>
//         </div>
//       </div>
//     );
//   });
// }
