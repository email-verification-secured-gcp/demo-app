# Web Application for Node.js and MySQL

This web application is a RESTful API built with Node.js and MySQL. The API adheres to certain standards and follows specific requirements outlined below.

## RESTful API Requirements

- All API request/response payloads must be in JSON format.
- Proper HTTP status codes should be returned for each API call.
- Code quality is a priority, and the application should maintain the highest standards. Unit and/or integration tests are recommended.

## Authentication Requirements

- Token-Based authentication is mandatory.
- The application must not support Session Authentication.
- Users are required to provide a basic authentication token for authenticated endpoints.

## Implemented APIs

### Swagger Docs

Visit the Swagger Docs endpoint for comprehensive API documentation.

### Create a New User

- Users can create an account by providing the following information:
  - Email Address
  - Password
  - First Name
  - Last Name
- `account_created` is set to the current time upon successful user creation.
- Users cannot set values for `account_created` and `account_updated`.
- Password is never returned in the response payload.
- Email address serves as the username.
- Application returns a 400 Bad Request HTTP response code when a user with the given email address already exists.
- Passwords are securely stored using the BCrypt password hashing scheme with salt.

### Update User Information

- Users can update their account information with the following fields:
  - First Name
  - Last Name
  - Password
- Attempting to update any other field results in a 400 Bad Request HTTP response code.
- `account_updated` is updated upon successful user information update.
- Users can only update their own account information.

### Get User Information

- Users can retrieve their account information.
- Response payload includes all user fields except for the password.

## Authentication Process

- Users must provide a basic authentication token for authenticated endpoints.

## Usage

1. **Clone the repository:**

   ```bash
   git clone <repository_url>


2. **Install node packages:**
    ```bash
   npm install


3. **Mysql - Database creation & user creation:**

```sql
show databases;

create database "databasename";

CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON database.* TO 'dada'@'localhost';

SHOW GRANTS FOR 'user'@'localhost';

DROP USER 'user'@'localhost';

FLUSH PRIVILEGES;
```

4. **Start application**

    ```bash
    npm start;