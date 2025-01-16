![project](https://github.com/user-attachments/assets/8b1cadec-5a77-44ab-8a70-ac9738c10eae)

# Email User Verification App

This application provides core functionalities for email user verification, including creating, retrieving, and updating user data, as well as publishing messages to Cloud Pub/Sub for verification purposes.

## Features

1. **Get User Information**
   - Retrieves user data by username (Basic Auth).
   - Omits sensitive information like password and verification status in the response.
   - Logs success and failure scenarios.

2. **Update User Information**
   - Updates user data based on the provided username and request body.
   - Logs success, failure, and potential issues.

3. **Create New User**
   - Creates a new user with default verification status set to `false`.
   - Publishes a message for verification purposes unless running in a test environment.
   - Logs success and failure scenarios.

---

## API Endpoints

### 1. **Get User**
**Endpoint:** `/v2/user`  
**Method:** `GET`  
**Authentication:** Basic Auth (Username and Password required)

**Functionality:**
- Retrieves user details by username.
- Returns 200 status with user details on success.
- Returns 400 status if the user is not found.
- Logs information on success or failure.

### 2. **Update User**
**Endpoint:** `/v2/user`  
**Method:** `PUT`  
**Authentication:** Basic Auth (Username and Passwordrequired)

**Functionality:**
- Updates user data with the details provided in the request body.
- Returns 204 status on successful update.
- Returns 404 status if the user is not found or no changes are made.
- Logs the result of the update process.

### 3. **Create User**
**Endpoint:** `/v2/user`  
**Method:** `POST`  

**Functionality:**
- Creates a new user with the provided details and default `is_verified: false`.
- Publishes a message for verification unless in the test environment.
- Returns 201 status with the newly created user on success.
- Returns 400 status if user creation fails.
- Logs the result of the creation process.

---

## Logging
This application uses `node-json-logger` for structured logging. Logs are categorized as follows:
- **Info:** Indicates successful operations (e.g., user found, user created, user updated).
- **Warn:** Highlights non-critical issues (e.g., user not found, unable to update).
- **Error:** Captures critical issues that disrupt functionality.

---

## Environment Variables
- `NODE_ENV`: Determines the environment in which the application is running. If set to `test`, publishing messages is skipped.

---

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in a `.env` file:
   ```env
   NODE_ENV=development
   ```

4. Run the application:
   ```bash
   npm start
   ```

5. For testing purposes:
   ```bash
   npm test
   ```

---

## Service Dependencies
- **User Service**: Provides core functions for interacting with user data:
  - `createUser`
  - `getUserByUsername`
  - `publishMessage`
  - `updateUserByUsername`

- **Basic Auth**: Used for user authentication based on username.

- **Logger**: `node-json-logger` for structured log management.

---

## Error Handling
- The application employs structured error handling with appropriate HTTP status codes:
  - `200 OK`: Success responses for GET operations.
  - `204 No Content`: Successful updates.
  - `400 Bad Request`: Invalid input or user-related errors.
  - `404 Not Found`: Resource not found.
  - `503 Service Unavailable`: Internal service issues.

---

## Continuous Integration and Deployment Workflow

This project uses a robust GitHub Actions workflow to ensure a streamlined CI/CD process. Below are the key components and how they enhance the project's functionality:

### 1. **Packer Integration**
Packer automates the creation of custom machine images for GCP (Google Cloud Platform) with all necessary dependencies and configurations pre-installed. This ensures consistency across deployments and eliminates manual setup steps.

#### Key Features of Packer in This Workflow:
- **Custom Image Creation**: Builds GCP images based on the `packer/image.pkr.hcl` template, which includes:
  - Pre-configured operating system (`centos-stream-8` by default).
  - Uploaded application files (`webapp.zip`) and configuration files.
  - Environment variables for database access (`DB_USER`, `DB_PASSWORD`).
  - Pre-installed dependencies and application setup.
- **Validation**: Ensures the Packer template is correctly formatted and valid before execution.
- **Timestamped Images**: Dynamically names images using timestamps to avoid conflicts and ensure traceability.
- **Efficient Deployment**: Once built, these images are used to create and update GCP instance templates, providing a consistent and reliable deployment environment.

#### Benefits:
- **Reliability**: Ensures all instances run the same configuration.
- **Scalability**: Easily replicates images across multiple instances.
- **Efficiency**: Reduces manual configuration and potential errors.

---

### 2. **GitHub Actions CI/CD Workflow**
The GitHub Actions workflow automates key stages of the development and deployment process. Below are the critical steps included in the workflow:

#### Key Workflow Steps:
1. **Code Checkout**:
   - Ensures the latest version of the code is available for build and testing.

2. **Google Cloud Authentication**:
   - Authenticates the workflow with GCP using service account credentials stored securely as GitHub secrets.

3. **Packer Setup and Validation**:
   - Installs and initializes Packer to create custom GCP images.
   - Validates the image template to prevent configuration errors.

4. **Database Setup**:
   - Sets up a MySQL database, creates users, and grants privileges for the application.

5. **Environment Configuration**:
   - Exports environment variables from GitHub secrets for use during the build process.

6. **Application Build and Testing**:
   - Installs Node.js dependencies.
   - Runs unit tests to validate the application functionality.

7. **Custom Image Build**:
   - Uses Packer to build a GCP machine image pre-configured with the application.

8. **Instance Template Deployment**:
   - Creates a new GCP instance template based on the custom image.
   - Includes startup scripts for initializing the application on instance creation.

9. **Managed Instance Group Update**:
   - Deploys the new instance template to a Managed Instance Group.
   - Initiates a rolling update, ensuring minimal downtime.

10. **Deployment Monitoring**:
    - Waits for the instance group to complete the rolling update and reach the desired state.






