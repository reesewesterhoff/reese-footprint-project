# Footprint Project Transition Tool

The client, the Footprint Project, presented the problem of many organizations remaining unaware of the feasibility of implementing solar energy alternatives in their relief projects. Often trying to gather data and put together a cohesive and realistic picture of when and how to implement solar can be very difficult, with the user experience often being very off putting for an organization trying to switch to solar. 

The solution created is application allowing users to calculate the cost benefits of transitioning from the use of diesel generators to solar grids, for the power needs of their humanitarian efforts. The user enters the details of their relief effort including the start and end dates, name and location of project site, and generator specs/fuel cost if any are being used. The results of their calculation are graphed after selecting the type of site they need to power, to illustrate the cost of solar versus the cost of diesel fuel over their project timeline. Users are then able to email a representative of the Footprint Project with a custom message and all of the information they entered for the calculation. Users are also able to register to the application and save multiple projects and subsequent sites with the ability to edit the timeline and energy budget costs to see the requirements necessary to transition to solar energy.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `footprint_project` and create tables listed in the database.sql file in the order presented.

If you would like to name your database something else, you will need to change `footprint_project` to the name of your new database name in `server/modules/pool.js`

## Development Setup Instructions

* Run `npm install`
* Create a `.env` file at the root of the project and paste these lines into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    PASSWORD=footprintEmailPassword
    ```
    While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
    Next you will want to replace `footprintEmailPassword` with the password matching that of an email address that is being used for testing purposes. You will also have to change the email address used in the `/server/routes/email.router.js` file. These need to be changed for production to the correct email and password that the client requires.
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm start`
* Navigate to `localhost:5000`

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

## Built With

* React.js
* Redux
* Redux Saga
* Google Maps API
* Node.js
* Express
* PostgreSQL
* Passport
* Nodemailer
* Material-UI
* Chart.js

## Authors

* Nicholas Manchanthasouk - Initial Work
* Nathan Salazar - Initial Work
* Samuel Solberg - Initial Work
* Reese Westerhoff - Initial Work