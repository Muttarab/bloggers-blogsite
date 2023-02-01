# Project Title
InvoHub

![Contributors](https://img.shields.io/github/contributors/InvoZone/resource-engagement?style=plastic)
![Forks](https://img.shields.io/github/forks/InvoZone/resource-engagement)
![Stars](https://img.shields.io/github/stars/InvoZone/resource-engagement)
![Licence](https://img.shields.io/github/license/InvoZone/resource-engagement)
![Issues](https://img.shields.io/github/InvoZone/resource-engagement/issues)

## Project Link:
Access site at [hub.invozone.com](https://hub.invozone.com/)

## Tools and Technologies:
- **React** for building user interface
- **Redux** for global state management
- **Express** for making back-end development easier
- **Google Authenticator** for token creation and authentication
- **Sequelize ORM** for connecting to the database (PostgreSQL)
- **SCSS** for better css organization and readability

## Pre-requisite Packages:
- **NVM:** 0.39.1
- **Node:** v18.12.1
- **Yarn:** 1.22.18

## How to clone and run front-end repository

### Step 1: Clone github repository
```
git clone https://github.com/InvoZone/resource-engagement.git
cd resource-engagement/
```
### Step 2: Install client-side dependencies  
```
yarn
```
### Step 3: Setting environment variables  
Create a new file as ".env", paste the below code and save. 
```
NODE_ENV="development"
REACT_APP_URL="https://hub.invozone.com"
REACT_APP_API_URL="http://127.0.0.1:8000"
REACT_APP_GOOGLE_LOGIN_CLIENT_ID=365043794676-m7ti5j4dviv7u70lbvnvse6coqd0emei.apps.googleusercontent.com
```
### Step 4:  To run client-side repository
```
yarn start
```
