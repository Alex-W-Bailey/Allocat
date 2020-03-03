# Allocat
## Simplifying complex projects through task allocation

---------------------------------------
https://allocat.herokuapp.com/
---------------------------------------


<img width="1358" alt="Screen Shot 2020-03-02 at 6 55 40 PM" src="https://user-images.githubusercontent.com/51139840/75734027-754fea00-5cbc-11ea-9e74-394b7d5017c0.png">


## Summary
Allocat was created to help users allocate tasks and manage complex projects through group collaboration. This full stack application guides users through creating a project, designating teams, and assigning tasks and collaborators to each team. Once a collaborator has created an account and been added to a project, they are able to claim tasks to complete and update the progress of their work to keep other collaborators up to date.
	
## Technologies Used

* React.js
* Create React App
* Next.js
* Express
* Passport 
* BCrypt
* MySQL
* Sequelize
* Node.js
* NPM
* JavaScript ES6
* Sass

## Creators

* Alex Bailey - Backend
* Danielle Burrage - Frontend
* Monica Dixon - Frontend
* Rico Quintanilla - Backend

## Problem

 We wanted to create an application that is easy to use and appropriate for a broad range of industries and educational purposes. Large projects can be overwhelming when trying to tackle everything at once. In researching other project management applications, we found many of them presented the user too much information at once, creating a daunting and cluttered experience that was hard to navigate and decipher. 

## Solution

Allocat aims to increase the efficiency of collaborative projects by helping collaborators break down large projects into bite-sized pieces. Clarifying the roles and responsibilities of each teammember and giving them the ability to keep other teammembers up to date, this application encourages clear communication, and taking things one step at a time while contributing to the big picture.

<img width="1185" alt="Screen Shot 2020-03-02 at 6 56 57 PM" src="https://user-images.githubusercontent.com/51139840/75734096-9e707a80-5cbc-11ea-8bb6-cac111eb6bdd.png">

## How to Use

### Create an Account
All collaborators must first create an account in order to have access to a project. This is as simple as completing the simple registration form that requires email, full name, and password.

### Create a New Project
Once a user logs in to their account they can create a project. Following the form will walk a user through creating teams. At least one team must be added in order for a project to be created. If working on a solo project, give the team your name. Its ok if you're the only one on it.

### Manage Teams and Tasks 
The projects overview page presents the user with all the projects that they are a collaborating on. It also updates them with notifications when they have been added to a new project, in which case, they have the option to accept or deny the request. Once the request is accepted, they have access to view the activity in the project. They can be added to a specific team, or left as unassigned. Each user has the ability to claim tasks, which are marked as high priority, medium priority and low priority so that collaborators know which ones need to be tackled first. Once a task is claimed, the project data is updated so that other users can see the changes. When a task is claimed, the status switches from "unclaimed" to "working on". The collaborator who claims the task is able to update the status to "stuck" if they need assistance or "complete" to let other members of the team know their work is done. Users can also unclaim and delete tasks.



<img width="1359" alt="Screen Shot 2020-03-02 at 6 56 17 PM" src="https://user-images.githubusercontent.com/51139840/75734055-84369c80-5cbc-11ea-92d7-920ad0404769.png">


<img width="1221" alt="Screen Shot 2020-03-02 at 6 57 44 PM" src="https://user-images.githubusercontent.com/51139840/75734131-b516d180-5cbc-11ea-81c1-24d664642609.png">
