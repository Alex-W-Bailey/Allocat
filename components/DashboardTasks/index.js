import React, { Component } from "react";
import NPLayout from "../NPLayout";
import { Form, ThemeProvider } from "react-bootstrap";
import { Card, Modal, Button } from "react-bootstrap";
import axios from "axios";
import FormMessage from "../FormMessage/index";

export default class DashboardTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      setShowForm: false,
      show: false,
      setShow: false,
      TaskName: "",
      TaskDescription: "",
      TaskTeam: "",
      TaskPriority: "",
      TaskDueDate: "",
      allTeams: [],
      allTasks: [],
      userTasks: [],
      isCreatingTask: false,
      isNameClicked: false,
      isDescriptionClicked: false,
      newTaskNameHover: false,
      newTaskDescriptionHover: false,
      newTaskName: "",
      newTaskDescription: "",
      newTaskDueDate: "",
      newTaskPriority: "",
      isError: false,
      errorMsg: ""
    };
  }

  componentDidMount() {
    this.getAllProjectTaskInfo();

    this.timerID = setInterval(() => this.getAllProjectTaskInfo(), 1000);
  }

  // componentWillUnmount() {
  //   clearInterval(this.timerID);
  // }

  async getAllProjectTaskInfo() {
    var isCreatingTask = this.state.isCreatingTask;

    if (isCreatingTask === false) {
      var url = window.location.href;
      var projectId = url.split("/")[4];

      await this.getAllTeams(projectId);
      await this.getAllTasks(projectId);
      await this.getUserTasks(projectId);
    }
  }

  async getAllTeams(projectId) {
    var newArr = [];

    await axios.get(`/api/allTeams/${projectId}`).then(response => {
      for (var i = 0; i < response.data.length; i++) {
        newArr.push(response.data[i].teamName);
      }
    });

    this.setState({
      allTeams: newArr
    });
  }

  async getAllTasks(projectId) {
    var newArr = [];

    await axios.get(`/api/allTasks/${projectId}`).then(response => {
      for (var i = 0; i < response.data.length; i++) {
        var newTask = {
          id: response.data[i].id,
          name: response.data[i].taskName,
          description: response.data[i].taskDescription,
          dueDate: response.data[i].taskDueDate,
          priority: response.data[i].taskPriority,
          team: response.data[i].taskTeam,
          status: response.data[i].taskStatus
        };

        newArr.push(newTask);
      }
    });

    this.setState({
      allTasks: newArr
    });
  }

  handleChange = e => {
    let objName = e.target.name;
    let objValue = e.target.value;

    this.setState({
      [objName]: objValue
    });
  };

  handleCreateTask = team => {
    var teamName = Object.values(team)[0];

    var url = window.location.href;
    var splitUrl = url.split("/")[4];

    let newTask = {
      projectId: splitUrl,
      taskName: this.state.newTaskName,
      taskDescription: this.state.newTaskDescription,
      taskDueDate: this.state.newTaskDueDate,
      taskPriority: this.state.newTaskPriority,
      taskTeam: teamName,
      taskStatus: "Unassigned"
    };

    axios.post("/api/newTask", newTask).then(response => {
      if (response.status === 200) {
        console.log("created task");
      }

      this.setState({
        isCreatingTask: false
      });

      this.handleShowAllTasks();
    });
  };

  handleCancelCreation = () => {
    this.setState({
      isCreatingTask: false
    });
  };

  handleClaimTask = e => {
    var objId = e.target.name;

    axios.put(`/api/claimTask/${objId}`).then(response => {
      console.log("updated task in db");
    });
  };

  handleClose = () => {
    this.setState({
      setShowForm: false
    });
  };

  handleShow = () => {
    this.setState({
      setShowForm: true
    });
  };

  handleShowModal = () => {
    this.setState({
      show: true
    });
  };

  handleHideModal = () => {
    this.setState({
      show: false
    });
  };

  handleNewShow = () => {
    this.setState({
      showForm: true
    });
  };

  handleShowAllTasks = () => {
    this.getAllProjectTaskInfo();

    this.setState({
      showForm: false
    });
  };

  handleToggleMouseOver = obj => {
    var stateName = obj + "Hover";
    var oppositeVal = !this.state[stateName];

    this.setState({
      [stateName]: oppositeVal
    });
  };

  async getUserTasks(projectId) {
    var newArr = [];

    await axios.get(`/api/userTasks/${projectId}`).then(response => {
      for (var i = 0; i < response.data.length; i++) {
        var newTask = {
          id: response.data[i].id,
          name: response.data[i].taskName,
          description: response.data[i].taskDescription,
          dueDate: response.data[i].taskDueDate,
          priority: response.data[i].taskPriority,
          team: response.data[i].taskTeam,
          status: response.data[i].taskStatus
        };

        newArr.push(newTask);
      }
    });

    this.setState({
      userTasks: newArr
    });
  }

  createTask(team) {
    console.log(this.state);

    this.setState({
      isCreatingTask: true
    });

    var teamName = Object.values(team)[0];
    var newArr = [];

    var url = window.location.href;
    var splitUrl = url.split("/")[4];
    let newTask = {
      id: -1,
      name: "Task Name",
      description: "Task Description",
      dueDate: "Task Due Date",
      priority: "Task Priority",
      team: teamName,
      status: "Unassigned"
    };

    newArr.push(newTask);

    var allTasks = this.state.allTasks;
    for (var i = 0; i < allTasks.length; i++) {
      newArr.push(allTasks[i]);
    }

    this.setState({
      allTasks: newArr
    });

    console.log("updated");
  }

  edit(elementToEdit) {
    if (elementToEdit === "name") {
      this.setState({
        isNameClicked: true,
        isDescriptionClicked: false,
        newTaskNameHover: false,
        newTaskDescriptionHover: false
      });
    } else if (elementToEdit === "description") {
      this.setState({
        isNameClicked: false,
        isDescriptionClicked: true,
        newTaskNameHover: false,
        newTaskDescriptionHover: false
      });
    } else if (elementToEdit === "none") {
      this.setState({
        isNameClicked: false,
        isDescriptionClicked: false,
        newTaskNameHover: false,
        newTaskDescriptionHover: false
      });
    }
  }

  render() {
    const isError = this.state.isError;
    const isNameClicked = this.state.isNameClicked;
    const isDescriptionClicked = this.state.isDescriptionClicked;

    var newTaskNameStyle;
    var newTaskDescriptionStyle;

    if (this.state.newTaskNameHover) {
      newTaskNameStyle = {
        color: "#2190cc",
        fontWeight: "bolder",
        border: "1px solid #2190cc",
        cursor: "pointer"
      };
    } else
      newTaskNameStyle = {
        color: "#242424",
        border: "none",
        cursor: "pointer"
      };

    if (this.state.newTaskDescriptionHover) {
<<<<<<< HEAD
      newTaskDescriptionStyle = {
        color: "#2190cc",
        fontWeight: "bolder",
        border: "1px solid #2190cc",
        cursor: "pointer"
      };
    } else
      newTaskDescriptionStyle = {
        color: "#242424",
        border: "none",
        cursor: "pointer"
      };
=======
      newTaskDescriptionStyle = { color: "#2190cc", fontWeight: "bolder", border: "1px solid #2190cc", cursor: "pointer" }
    } else {
      newTaskDescriptionStyle = { color: "#242424", border: "none", cursor: "pointer" }
    }
>>>>>>> 9f9b84efc2b4b74c8ea62346d1bcd8f92a0fc100

    if (this.state.showForm) {
      return (
        <NPLayout>
          <div className='col-md-12'>
            <Button onClick={() => this.handleShowAllTasks()}>
              Back to All Tasks
            </Button>
          </div>
          <div className='row mt-5'>
            <div className='col-md-12 mx-auto'>
              <h2>Add Tasks to Complete</h2>

              <Form>
                <label htmlFor='TaskName'>Name of Tasks:</label>
                <input
                  type='text'
                  name='TaskName'
                  className='form-control'
                  placeholder='Task Name'
                  onChange={this.handleChange.bind(this)}
                />
                <br />
                <label htmlFor='TaskDescription'>Description of Task:</label>
                <input
                  type='text'
                  name='TaskDescription'
                  className='form-control'
                  placeholder='Task Description'
                  onChange={this.handleChange.bind(this)}
                />
                <br />
                <label htmlFor='TaskTeam'>Which Team is This a Task For?</label>
                <Form.Group controlId='exampleForm.ControlSelect1'>
                  <Form.Control
                    onChange={this.handleChange.bind(this)}
                    as='select'
                    name='TaskTeam'
                  >
                    <option>Select A Team</option>
                    {this.state.allTeams.map(team => {
                      return <option value={team}>{team}</option>;
                    })}
                  </Form.Control>
                </Form.Group>
                <br />
                <label htmlFor='taskDueDate'>Due Date (MM/DD/YY): </label>
                <input
                  type='text'
                  name='TaskDueDate'
                  className='form-control'
                  placeholder='02/29/20'
                  onChange={this.handleChange.bind(this)}
                />
                <br />
                <Form.Group>
                  <Form.Label>Priority Level</Form.Label>
                  <Form.Control
                    onChange={this.handleChange.bind(this)}
                    as='select'
                    name='TaskPriority'
                  >
                    <option>High Priority</option>
                    <option>Medium Priority</option>
                    <option>Low Priority</option>
                  </Form.Control>
                </Form.Group>
                <br />
                {isError ? (
                  <FormMessage status='error' message={this.state.errorMsg} />
                ) : (
                  <h1></h1>
                )}
                <button type='button' onClick={() => this.handleCreateTask()}>
                  Add Task
                </button>
                <br />
              </Form>
            </div>
          </div>
        </NPLayout>
      );
    } else {
      return (
        <React.Fragment>
<<<<<<< HEAD
          {this.state.allTeams.map(team => {
            return (
              <React.Fragment>
                <div className='team-container mr-5'>
                  <div className='row pl-5'>
                    <div className='col-lg-6'>
                      <h1 className='team-header align-middle'>{team}</h1>
                    </div>
                    <div className='col-lg-6'>
                      <button
                        className='btn px-5 float-right'
                        onClick={() => this.createTask({ team })}
                      >
                        Create New Task
                      </button>
=======
          <div className="team-container mr-5">
            <div className="row pl-5">
              <div className="row">
                <div className="">
                  <h1>My Tasks</h1>
                </div>
              </div>
              <div className="row">
              {
                this.state.userTasks.map((userTask) => {
                  return (
                    <div className="col-lg-3 mb2">
                      <div className="task-card card">
                        <div className="card-body d-flex flex-column over">
                          <h5 className="task-name card-title mt-3">{userTask.name}</h5>
                          <div className="card-subtitle mb-1 text-muted">
                            {userTask.priority}
                          </div>
                          <Card.Text>{userTask.status}</Card.Text>
                          <div className="row my-auto">
                            <Button name={userTask.id} variant='danger'
                              className="task-btn" onClick={(e) => { this.handleClaimTask(e) }}>Claim Task</Button>
                            <Button variant='primary' className="task-btn" onClick={() => this.handleShowModal()}>
                              View Details
                    </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              </div>
            </div>
          </div>
          {
            this.state.allTeams.map(team => {
              return (
                <React.Fragment>
                  <div className="team-container mr-5">
                    <div className="row pl-5">
                      <div className="col-lg-6">
                        <h1 className="team-header align-middle">{team}</h1>
                      </div>
                      <div className="col-lg-6">
                        <button className="btn px-5 float-right" onClick={() => this.createTask({ team })}>Create New Task</button>
                      </div>
>>>>>>> 9f9b84efc2b4b74c8ea62346d1bcd8f92a0fc100
                    </div>
                  </div>

<<<<<<< HEAD
                  <div className='row pl-5 my-3'>
                    {this.state.allTasks.map(task => {
                      if (task.team === team) {
                        return task.id === -1 ? (
                          <div className='col-lg-3 mb-2'>
                            <div className='task-card card'>
                              <div className='card-body d-flex flex-column over'>
                                {isNameClicked ? (
                                  <div>
                                    <h5 className='task-name mx-auto  card-title mt-3'>
                                      <input
                                        text='text'
                                        name='newTaskName'
                                        value={this.state.newTaskName}
                                        onChange={this.handleChange.bind(this)}
                                      ></input>
                                    </h5>
                                    <div
                                      className='card-subtitle mb-1 text-muted'
                                      onMouseOver={() =>
                                        this.handleToggleMouseOver(
                                          "newTaskDescription"
                                        )
                                      }
                                      onClick={() => this.edit("description")}
                                    >
                                      {this.state.newTaskDescription === "" ? (
                                        <p style={newTaskDescriptionStyle}>
                                          {task.description}
                                        </p>
                                      ) : (
                                        <p style={newTaskDescriptionStyle}>
                                          {this.state.newTaskDescription}
                                        </p>
                                      )}
                                    </div>
                                    <div
                                      className='card-subtitle mb-1 text-muted'
                                      onClick={() => this.edit("none")}
                                    >
                                      <Form.Group>
                                        <Form.Control
                                          placeholder='Select Priority Level'
                                          onChange={this.handleChange.bind(
                                            this
                                          )}
                                          as='select'
                                          name='newTaskPriority'
                                        >
                                          <option value='N/A' disabled selected>
                                            Select Priority Level
                                          </option>
                                          <option
                                            value='High'
                                            style={{
                                              color: "#e1651b",
                                              fontWeight: "bold"
                                            }}
                                          >
                                            High Priority
                                          </option>
                                          <option
                                            value='Medium'
                                            style={{
                                              color: "#ffaa0a",
                                              fontWeight: "bold"
                                            }}
                                          >
                                            Medium Priority
                                          </option>
                                          <option
                                            value='Low'
                                            style={{
                                              color: "#2ab009",
                                              fontWeight: "bold"
                                            }}
                                          >
                                            Low Priority
                                          </option>
                                        </Form.Control>
                                      </Form.Group>
=======
                    <div className="row pl-5 my-3">
                      {
                        this.state.allTasks.map(task => {
                          if (task.team === team) {
                            if (task.status === "Unassigned") {
                              return (
                                task.id === -1 ? (
                                  <div className="col-lg-3 mb-2">
                                    <div className="task-card card">
                                      <div className="card-body d-flex flex-column over">
                                        {
                                          isNameClicked ? (
                                            <div>
                                              <h5 className="task-name mx-auto  card-title mt-3"><input text="text" name="newTaskName" value={this.state.newTaskName} onChange={this.handleChange.bind(this)}></input></h5>
                                              <div className="card-subtitle mb-1 text-muted" onMouseOver={() => this.handleToggleMouseOver("newTaskDescription")} onClick={() => this.edit("description")}>
                                                {
                                                  this.state.newTaskDescription === "" ?
                                                    (
                                                      <p style={newTaskDescriptionStyle}>{task.description}</p>
                                                    ) : (
                                                      <p style={newTaskDescriptionStyle}>{this.state.newTaskDescription}</p>
                                                    )
                                                }
                                              </div>
                                              <div className="card-subtitle mb-1 text-muted" onClick={() => this.edit("none")}>
                                                <Form.Group>
                                                  <Form.Control placeholder="Select Priority Level" onChange={this.handleChange.bind(this)} as='select' name="newTaskPriority">
                                                    <option value="N/A" disabled selected>Select Priority Level</option>
                                                    <option value="High" style={{ color: "#e1651b", fontWeight: "bold" }}>High Priority</option>
                                                    <option value="Medium" style={{ color: "#ffaa0a", fontWeight: "bold" }}>Medium Priority</option>
                                                    <option value="Low" style={{ color: "#2ab009", fontWeight: "bold" }}>Low Priority</option>
                                                  </Form.Control>
                                                </Form.Group>
                                              </div>
                                              <Card.Text onClick={() => this.edit("none")}>{task.status}</Card.Text>
                                            </div>
                                          ) : isDescriptionClicked ? (
                                            <div>
                                              <h5 className="task-name mx-auto card-title mt-3" onMouseOver={() => this.handleToggleMouseOver("newTaskName")} onClick={() => this.edit("name")}>
                                                {
                                                  this.state.newTaskName === "" ?
                                                    (
                                                      <p style={newTaskNameStyle}>{task.name}</p>
                                                    ) : (
                                                      <p style={newTaskNameStyle}>{this.state.newTaskName}</p>
                                                    )
                                                }
                                              </h5>
                                              <div className="card-subtitle mb-1 text-muted">
                                                <input text="text" name="newTaskDescription" value={this.state.newTaskDescription} onChange={this.handleChange.bind(this)}></input>
                                              </div>
                                              <div className="card-subtitle mb-1 text-muted" onClick={() => this.edit("none")}>
                                                <Form.Group>
                                                  <Form.Control placeholder="Select Priority Level" onChange={this.handleChange.bind(this)} as='select' name="newTaskPriority">
                                                    <option value="N/A" disabled selected>Select Priority Level</option>
                                                    <option value="High" style={{ color: "#e1651b", fontWeight: "bold" }}>High Priority</option>
                                                    <option value="Medium" style={{ color: "#ffaa0a", fontWeight: "bold" }}>Medium Priority</option>
                                                    <option value="Low" style={{ color: "#2ab009", fontWeight: "bold" }}>Low Priority</option>
                                                  </Form.Control>
                                                </Form.Group>
                                              </div>
                                              <Card.Text onClick={() => this.edit("none")}>{task.status}</Card.Text>
                                            </div>
                                          ) : (
                                                <div>
                                                  <h5 className="task-name card-title mt-3" onMouseOver={() => this.handleToggleMouseOver("newTaskName")} onMouseLeave={() => this.handleToggleMouseOver("newTaskName")} onClick={() => this.edit("name")}>
                                                    {
                                                      this.state.newTaskName === "" ?
                                                        (
                                                          <p style={newTaskNameStyle}>{task.name}</p>
                                                        ) : (
                                                          <p style={newTaskNameStyle}>{this.state.newTaskName}</p>
                                                        )
                                                    }
                                                  </h5>
                                                  <div className="card-subtitle mb-1 text-muted" onMouseOver={() => this.handleToggleMouseOver("newTaskDescription")} onMouseLeave={() => this.handleToggleMouseOver("newTaskDescription")} onClick={() => this.edit("description")}>
                                                    {
                                                      this.state.newTaskDescription === "" ?
                                                        (
                                                          <p style={newTaskDescriptionStyle}>{task.description}</p>
                                                        ) : (
                                                          <p style={newTaskDescriptionStyle}>{this.state.newTaskDescription}</p>
                                                        )
                                                    }
                                                  </div>
                                                  <div className="card-subtitle mb-1 text-muted" onClick={() => this.edit("none")}>
                                                    <Form.Group>
                                                      <Form.Control placeholder="Select Priority Level" onChange={this.handleChange.bind(this)} as='select' name="newTaskPriority">
                                                        <option value="N/A" disabled selected>Select Priority Level</option>
                                                        <option value="High" style={{ color: "#e1651b", fontWeight: "bold" }}>High Priority</option>
                                                        <option value="Medium" style={{ color: "#ffaa0a", fontWeight: "bold" }}>Medium Priority</option>
                                                        <option value="Low" style={{ color: "#2ab009", fontWeight: "bold" }}>Low Priority</option>
                                                      </Form.Control>
                                                    </Form.Group>
                                                  </div>
                                                  <Card.Text onClick={() => this.edit("none")}>{task.status}</Card.Text>
                                                </div>
                                              )
                                        }
                                        <div className="row">
                                          <Button variant='danger' className="task-btn" onClick={() => this.handleCreateTask({ team })}>Create Task</Button>
                                          <Button variant='primary' className="task-btn" onClick={() => this.handleCancelCreation()}>
                                            Cancel
                                      </Button>
                                        </div>
                                      </div>
>>>>>>> 9f9b84efc2b4b74c8ea62346d1bcd8f92a0fc100
                                    </div>
                                    <Card.Text
                                      onClick={() => this.edit("none")}
                                    >
                                      {task.status}
                                    </Card.Text>
                                  </div>
<<<<<<< HEAD
                                ) : isDescriptionClicked ? (
                                  <div>
                                    <h5
                                      className='task-name mx-auto card-title mt-3'
                                      onMouseOver={() =>
                                        this.handleToggleMouseOver(
                                          "newTaskName"
                                        )
                                      }
                                      onClick={() => this.edit("name")}
                                    >
                                      {this.state.newTaskName === "" ? (
                                        <p style={newTaskNameStyle}>
                                          {task.name}
                                        </p>
                                      ) : (
                                        <p style={newTaskNameStyle}>
                                          {this.state.newTaskName}
                                        </p>
                                      )}
                                    </h5>
                                    <div className='card-subtitle mb-1 text-muted'>
                                      <input
                                        text='text'
                                        name='newTaskDescription'
                                        value={this.state.newTaskDescription}
                                        onChange={this.handleChange.bind(this)}
                                      ></input>
                                    </div>
                                    <div
                                      className='card-subtitle mb-1 text-muted'
                                      onClick={() => this.edit("none")}
                                    >
                                      <Form.Group>
                                        <Form.Control
                                          placeholder='Select Priority Level'
                                          onChange={this.handleChange.bind(
                                            this
                                          )}
                                          as='select'
                                          name='newTaskPriority'
                                        >
                                          <option value='N/A' disabled selected>
                                            Select Priority Level
                                          </option>
                                          <option
                                            value='High'
                                            style={{
                                              color: "#e1651b",
                                              fontWeight: "bold"
                                            }}
                                          >
                                            High Priority
                                          </option>
                                          <option
                                            value='Medium'
                                            style={{
                                              color: "#ffaa0a",
                                              fontWeight: "bold"
                                            }}
                                          >
                                            Medium Priority
                                          </option>
                                          <option
                                            value='Low'
                                            style={{
                                              color: "#2ab009",
                                              fontWeight: "bold"
                                            }}
                                          >
                                            Low Priority
                                          </option>
                                        </Form.Control>
                                      </Form.Group>
                                    </div>
                                    <Card.Text
                                      onClick={() => this.edit("none")}
                                    >
                                      {task.status}
                                    </Card.Text>
                                  </div>
                                ) : (
                                  <div>
                                    <h5
                                      className='task-name card-title mt-3'
                                      onMouseOver={() =>
                                        this.handleToggleMouseOver(
                                          "newTaskName"
                                        )
                                      }
                                      onMouseLeave={() =>
                                        this.handleToggleMouseOver(
                                          "newTaskName"
                                        )
                                      }
                                      onClick={() => this.edit("name")}
                                    >
                                      {this.state.newTaskName === "" ? (
                                        <p style={newTaskNameStyle}>
                                          {task.name}
                                        </p>
                                      ) : (
                                        <p style={newTaskNameStyle}>
                                          {this.state.newTaskName}
                                        </p>
                                      )}
                                    </h5>
                                    <div
                                      className='card-subtitle mb-1 text-muted'
                                      onMouseOver={() =>
                                        this.handleToggleMouseOver(
                                          "newTaskDescription"
                                        )
                                      }
                                      onMouseLeave={() =>
                                        this.handleToggleMouseOver(
                                          "newTaskDescription"
                                        )
                                      }
                                      onClick={() => this.edit("description")}
                                    >
                                      {this.state.newTaskDescription === "" ? (
                                        <p style={newTaskDescriptionStyle}>
                                          {task.description}
                                        </p>
                                      ) : (
                                        <p style={newTaskDescriptionStyle}>
                                          {this.state.newTaskDescription}
                                        </p>
                                      )}
                                    </div>
                                    <div
                                      className='card-subtitle mb-1 text-muted'
                                      onClick={() => this.edit("none")}
                                    >
                                      <Form.Group>
                                        <Form.Control
                                          placeholder='Select Priority Level'
                                          onChange={this.handleChange.bind(
                                            this
                                          )}
                                          as='select'
                                          name='newTaskPriority'
                                        >
                                          <option value='N/A' disabled selected>
                                            Select Priority Level
                                          </option>
                                          <option
                                            value='High'
                                            style={{
                                              color: "#e1651b",
                                              fontWeight: "bold"
                                            }}
                                          >
                                            High Priority
                                          </option>
                                          <option
                                            value='Medium'
                                            style={{
                                              color: "#ffaa0a",
                                              fontWeight: "bold"
                                            }}
                                          >
                                            Medium Priority
                                          </option>
                                          <option
                                            value='Low'
                                            style={{
                                              color: "#2ab009",
                                              fontWeight: "bold"
                                            }}
                                          >
                                            Low Priority
                                          </option>
                                        </Form.Control>
                                      </Form.Group>
                                    </div>
                                    <Card.Text
                                      onClick={() => this.edit("none")}
                                    >
                                      {task.status}
                                    </Card.Text>
                                  </div>
                                )}
                                <div className='row'>
                                  <Button
                                    variant='danger'
                                    className='task-btn'
                                    onClick={() =>
                                      this.handleCreateTask({ team })
                                    }
                                  >
                                    Create Task
                                  </Button>
                                  <Button
                                    variant='primary'
                                    className='task-btn'
                                    onClick={() => this.handleCancelCreation()}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className='col-lg-3 mb2'>
                            <div className='task-card card'>
                              <div className='card-body d-flex flex-column over'>
                                <h5 className='task-name card-title mt-3'>
                                  {task.name}
                                </h5>
                                <div className='card-subtitle mb-1 text-muted'>
                                  {task.priority}
                                </div>
                                <Card.Text>{task.status}</Card.Text>
                                <div className='row my-auto'>
                                  <Button variant='danger' className='task-btn'>
                                    Claim Task
                                  </Button>
                                  <Button
                                    variant='primary'
                                    className='task-btn'
                                    onClick={() => this.handleShowModal()}
                                  >
                                    View Details
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
=======
                                ) : (
                                    <div className="col-lg-3 mb2">
                                      <div className="task-card card">
                                        <div className="card-body d-flex flex-column over">
                                          <h5 className="task-name card-title mt-3">{task.name}</h5>
                                          <div className="card-subtitle mb-1 text-muted">
                                            {task.priority}
                                          </div>
                                          <Card.Text>{task.status}</Card.Text>
                                          <div className="row my-auto">
                                            <Button name={task.id} variant='danger'
                                              className="task-btn" onClick={(e) => { this.handleClaimTask(e) }}>Claim Task</Button>
                                            <Button variant='primary' className="task-btn" onClick={() => this.handleShowModal()}>
                                              View Details
                                      </Button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )
                              )
                            }
                          }
                        })
>>>>>>> 9f9b84efc2b4b74c8ea62346d1bcd8f92a0fc100
                      }
                    })}
                  </div>
                </div>
              </React.Fragment>
            );
          })}

          <Modal show={this.state.show} onHide={() => this.handleClose()}>
            <Modal.Header closeButton>
              <Modal.Title>Project Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='container'>
                <div className='row'>Project Description will go here</div>
                <div className='row'>Level of Priority</div>
                <div className='row'>Due Date</div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant='secondary'
                onClick={() => this.handleHideModal()}
              >
                Close
              </Button>
              <Button variant='danger' onClick={() => this.handleClose()}>
                Claim Task
              </Button>
            </Modal.Footer>
          </Modal>
        </React.Fragment>
      );
    }
  }
}
