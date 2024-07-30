

# Todo List API

## Overview

A simple RESTful API for managing a todo list. The API allows users to create, read, update, delete, and mark todos as completed. This application uses Node.js with Express and stores data in a JSON file on the filesystem.

## Features

- **Fetch Todos**: Retrieve the list of todos with optional search and filtering.
- **Add Todo**: Add a new todo item to the list.
- **Update Todo**: Update an existing todo item.
- **Delete Todo**: Remove a todo item from the list.
- **Mark as Done**: Mark a todo item as completed.

## Technologies

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for Node.js.
- **Body-parser**: Middleware to parse JSON request bodies.
- **YAMLJS**: YAML parser for Swagger/OpenAPI documentation.
- **Swagger UI**: Interactive API documentation.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. [Download Node.js](https://nodejs.org/)

### Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

### Running the Application

1. **Start the Server**

   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000` by default.

2. **Access Swagger Documentation**

   Visit `http://localhost:3000/api-docs` to view interactive API documentation provided by Swagger UI.

### API Endpoints

#### Fetch Todos

- **URL**: `/api/todos`
- **Method**: `GET`
- **Query Parameters**:
  - `search` (optional): Filter todos by search term.
  - `date` (optional): Filter todos by date of last update.
- **Responses**:
  - **200 OK**:
    ```json
    [
      {
        "id": "1677152000000",
        "text": "Learn Node.js",
        "completed": false,
        "createdAt": "2024-07-30T12:00:00Z",
        "updatedAt": "2024-07-30T12:00:00Z"
      }
    ]
    ```

#### Add Todo

- **URL**: `/api/todos`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "text": "Learn Node.js"
  }
  ```
- **Responses**:
  - **201 Created**:
    ```json
    {
      "id": "1677152000000",
      "text": "Learn Node.js",
      "completed": false,
      "createdAt": "2024-07-30T12:00:00Z",
      "updatedAt": "2024-07-30T12:00:00Z"
    }
    ```

#### Update Todo

- **URL**: `/api/todos/{id}`
- **Method**: `PUT`
- **Request Body**:
  ```json
  {
    "text": "Learn Node.js and Express"
  }
  ```
- **Responses**:
  - **200 OK**:
    ```json
    {
      "id": "1677152000000",
      "text": "Learn Node.js and Express",
      "completed": false,
      "createdAt": "2024-07-30T12:00:00Z",
      "updatedAt": "2024-07-30T12:30:00Z"
    }
    ```

#### Delete Todo

- **URL**: `/api/todos/{id}`
- **Method**: `DELETE`
- **Responses**:
  - **204 No Content**: Todo successfully deleted.

#### Mark as Done

- **URL**: `/api/todos/{id}/done`
- **Method**: `PATCH`
- **Responses**:
  - **200 OK**:
    ```json
    {
      "id": "1677152000000",
      "text": "Learn Node.js",
      "completed": true,
      "createdAt": "2024-07-30T12:00:00Z",
      "updatedAt": "2024-07-30T12:30:00Z"
    }
    ```

## File Structure

```
todo-list-api/
│
├── data/
│   └── todos.json       # JSON file for storing todos
│
├── routes/
│   └── todos.js          # Express routes for todos
│
├── node_modules/         # Node.js dependencies
│
├── swagger.yaml          # Swagger/OpenAPI documentation
├── index.js              # Main application file
├── package.json          # Project metadata and dependencies
├── package-lock.json     # Exact versions of installed dependencies
└── README.md             # Project documentation
```

