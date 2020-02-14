import React, { useState } from 'react';
import axios from "axios";
import { ListGroup, Button } from "react-bootstrap";

function Tasks({ task, index }) {
    return <div className="task-name">{task.name}</div>;
}

function Dashboard() {
    const [tasks, setTasks] = useState([
        {
            name: "Task Name",
            priorityLevel: "High",
            priorityColor: "danger",
            assignStatus: "Assigned",
            description: "This is the description of the task",
        },
        {
            name: "Task Name",
            priorityLevel: "High",
            priorityColor: "danger",
            assignStatus: "Assigned",
            description: "This is the description of the task",
        },
        {
            name: "Task Name",
            priorityLevel: "High",
            priorityColor: "danger",
            assignStatus: "Assigned",
            description: "This is the description of the task",
        }
    ]);

    const getTasks = () => {
        axios.get("/api/Tasks").then(tasksFound => {
            if (tasksFound.data.length > 0) {
                for (var i = 0; i < tasksFound.data.length; i++) {
                    const newTasks = [...tasks, tasksFound.data];
                    setTasks(newTasks);
                }
            } else {
                console.log("No projects found...");
            }
        });
    }

    return (
        <div className="app">
            <div>
                {tasks.map((task, index) => (
                    <Tasks key={index} index={index} task={task} />
                ))}
            </div>
        </div>
    );
}

export default Dashboard; 