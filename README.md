# InvoHub
Source code built with:
- **React** for building user interface
- **Redux** for global state management
- **Express** for making back-end development easier
- **Google Authenticator** for token creation and authentication
- **Sequelize ORM** for connecting to the database (PostgreSQL)
- **SASS** for better css organization and readability

## How to close and run front-end repository

Step 1: Installing dependencies
```bash
git clone https://github.com/InvoZone/resource-engagement.git
cd resource-engagement/

#install client-side dependencies
yarn

#if you want to run the client-side
yarn start
```

Step 2: creating tables in database
```
CREATE TABLE entries(
    header char(50) NOT NULL,
    subheader char(300) NOT NULL,
    cateogry char(100) NOT NULL,
    content text NOT NULL,
    author char(50) NOT NULL,
    date char(20) NOT NULL
);
CREATE TABLE users(
    email char(100) NOT NULL,
    username char(20) NOT NULL,
    hash text NOT NULL
);
```

Step 3: Setting environment variables  
Create a new file as ".env", paste the below code and save. 
```
NODE_ENV="development"
REACT_APP_URL="https://hub.invozone.com"
REACT_APP_API_URL="http://127.0.0.1:8000"
REACT_APP_GOOGLE_LOGIN_CLIENT_ID=365043794676-m7ti5j4dviv7u70lbvnvse6coqd0emei.apps.googleusercontent.com
```
