# Backend Description

The backend of this project is responsible for handling the server-side logic, database interactions, and API endpoints. It is built using Node.js and Express.js, providing a robust and scalable foundation for the application.

## Key Features

- **RESTful API**: Implements a RESTful API to handle client requests and responses.
- **Database Integration**: Connects to a MongoDB database for data storage and retrieval.
- **Authentication**: Includes user authentication and authorization using JWT.
- **Error Handling**: Comprehensive error handling to ensure smooth operation and debugging.
- **Environment Configuration**: Utilizes environment variables for configuration management.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- dotenv
- bcryptjs

## Setup Instructions

1. Install dependencies:
  ```bash
  npm install
  ```
2. Create a `.env` file and add your environment variables:
  ```env
  PORT=3000
  MONGODB_URI=your_mongodb_uri
  JWT_SECRET=your_secret_key
  ```
3. Start the server:
  ```bash
  npm start
  ```

## API Endpoints

### Swagger

- **API Documentation**
  - **Endpoint**: `GET /docs`
  - **Description**: Provides interactive API documentation using Swagger UI. This allows developers to explore and test the API endpoints directly from the browser.
  - **Responses**:
    - `200`: Swagger UI loaded successfully.
    - `404`: Documentation not found.


### Accounts

- **Create a new account**
  - **Endpoint**: `POST /account/create`
  - **Description**: Creates a new account with the specified type, name, and initial balance.
  - **Request Body**:
    - `accountType` (string, required): Type of the account (`savings` or `checking`).
    - `accountName` (string, required): Name of the account.
    - `balance` (number, required): Initial balance of the account.
  - **Responses**:
    - `201`: Account created successfully.
    - `400`: Bad request.

- **View an account by ID**
  - **Endpoint**: `GET /account/{id}`
  - **Description**: Retrieves the details of an account by its ID.
  - **Parameters**:
    - `id` (string, required): The ID of the account.
  - **Responses**:
    - `200`: Account details.
    - `404`: Account not found.

- **Get all accounts**
  - **Endpoint**: `GET /account`
  - **Description**: Retrieves a list of all accounts.
  - **Responses**:
    - `200`: A list of accounts.
    - `404`: No accounts found.

### Auth

- **Register a new user**
  - **Endpoint**: `POST /auth/signup`
  - **Description**: Registers a new user with the provided email, username, and password.
  - **Request Body**:
    - `email` (string, required): Email of the user.
    - `username` (string, required): Username of the user.
    - `password` (string, required): Password of the user.
  - **Responses**:
    - `201`: User created successfully.
    - `400`: Bad request.

- **Login a user**
  - **Endpoint**: `POST /auth/login`
  - **Description**: Logs in a user with the provided email and password.
  - **Request Body**:
    - `email` (string, required): Email of the user.
    - `password` (string, required): Password of the user.
  - **Responses**:
    - `200`: User logged in successfully.
    - `401`: Unauthorized.
    - `403`: Invalid credentials.

### Transactions

- **Transfer money between accounts**
  - **Endpoint**: `POST /transaction/transfer`
  - **Description**: Transfers money from one account to another.
  - **Request Body**:
    - `fromAccountName` (string, required): Name of the account to transfer from.
    - `toAccountName` (string, required): Name of the account to transfer to.
    - `amount` (number, required): Amount to transfer.
  - **Responses**:
    - `200`: Transfer successful.
    - `400`: Invalid request.

- **Generate account statement for a specific account**
  - **Endpoint**: `GET /transaction/history/{accountName}`
  - **Description**: Generates a statement for the specified account.
  - **Parameters**:
    - `accountName` (string, required): The name of the account.
  - **Responses**:
    - `200`: Statement generated successfully.
    - `400`: Invalid request.

- **Get all transactions**
  - **Endpoint**: `GET /transaction/history`
  - **Description**: Retrieves a list of all transactions.
  - **Responses**:
    - `200`: Transactions retrieved successfully.
    - `400`: Invalid request.
