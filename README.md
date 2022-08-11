# VenbooWebApp


## Table of Contents

- [Description](#description)
- [Screen Shot](#screen-shot)
- [Built With](#built-with)
- [Prerequisites](#prerequisite)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)


## Description

The Venboo Webapp is a centralized hub where host users can create and manage their events, vendor users can browse events and apply to booths, and admins can manage their business through a variety of built in tools.


## Screen Shot
![image](https://user-images.githubusercontent.com/111070987/184179968-241b557f-6e87-474c-a490-226c4852b9db.png)


## Built With

<a href="https://www.w3schools.com/w3css/defaulT.asp"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" height="40px" width="40px" /></a>
<a href="https://www.w3schools.com/html/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" height="40px" width="40px" /></a>
<a href="https://www.w3schools.com/js/default.asp"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" height="40px" width="40px" /></a>
<a href="https://www.postgresql.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" height="40px" width="40px" /></a>
<a href="https://reactjs.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" height="40px" width="40px" /></a>
<a href="https://redux.js.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" height="40px" width="40px" /></a>
<a href="https://material-ui.com/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg" height="40px" width="40px" /></a>
<a href="https://nodejs.org/en/"><img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-plain.svg" height="40px" width="40px" /></a>


## Prerequisites

This software is required before installing the app:
- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)


## Installation

- Start by forking the repo
- Copy the SSH key to the clipboard
- Open up your terminal and type in... `git clone {paste SSH key here}`
- Navigate into the folder containing the cloned repo in your terminal
- Open the repo folder inside your code editor
- In the editor terminal, run `npm install`, this will install all of the app's dependencies
- Create a database called `venboo`, in PostgreSQL
- Copy the database.sql files and run them in the PostgreSQL termianl to create all the tables needed to run the app.
- The startingData.sql files will create the initial admin user.
- Inside your code editor, run `npm run server` in the terminal
- Inside a second terminal, run `npm run client`


## Usage

When everything is installed correctly, the app should open up in your default browser
If not, you can navigate to http://localhost:3000/#/

Video walkthrough of app: https://www.youtube.com/watch?v=j9FIXXvbMaI 


## Deployment

- The app has been deployed via Heroku
- Heroku login info is located in the hand off document
- If you need to make updates you'll have to push up to Heroku
- In your editor terminal type... `heroku git:remote` to show the link to your heroku server
- In the terminal type... `git push heroku main`, this is push your updates to heroku
- The new updates will take a minute to be live.
