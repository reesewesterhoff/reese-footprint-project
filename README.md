# Footprint Project Transition Tool

Our client the Footprint Project presented the problem of disaster relief organizations being unaware of the possibility of implementing solar energy infrastructures with their aid projects. The emphasis was made that in many cases this was within their existing energy budget. Finding data that paints a clear and realistic picture of when and how to implement solar can be very difficult.  It is also often that the user experience is vague and confusing.

The solution is an application that allows users to run a cost-benefit analysis of transitioning from the use of diesel generators to solar grids which power their humanitarian efforts. The user enters the details of their aid effort including the start and end dates, name and location of the relief site followed by a monthly energy budget.  This will be different if a generator already exists as the energy budget will now be their monthly fuel cost. The results of their calculation are graphed after selecting the type of site they need to power.  This illustrates the cost of solar versus the cost of diesel fuel over their project timeline. Users are then able to email a representative of the Footprint Project with a custom message which includes all of their site calculations. They are also able to register to the application where they can save multiple projects and subsequent sites. Within each specific project is the ability to edit the timeline and energy budget for a site to see the requirements necessary to transition to solar energy.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
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
* react-google-maps
* Node.js
* Express
* PostgreSQL
* Passport
* Nodemailer
* Material-UI
* react-chartjs-2
* Moment.js

## Authors

* Nicholas Manchanthasouk - Initial Work
* Nathan Salazar - Initial Work
* Samuel Solberg - Initial Work
* Reese Westerhoff - Initial Work