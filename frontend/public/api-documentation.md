# API Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication
All authenticated endpoints require a JWT token sent via httpOnly cookie. The token is automatically set after successful login/registration.

---

## Authentication Endpoints

### 1. Register User
**Endpoint:** `POST /auth/register`

**Description:** Create a new user account

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- `name`: Required, max 50 characters
- `email`: Required, valid email format
- `password`: Required, minimum 6 characters

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (400):**
```json
{
  "message": "User already exists with this email"
}
```

---

### 2. Login User
**Endpoint:** `POST /auth/login`

**Description:** Authenticate user and receive JWT token

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (401):**
```json
{
  "message": "Invalid email or password"
}
```

---

### 3. Logout User
**Endpoint:** `POST /auth/logout`

**Description:** Clear authentication cookie

**Authentication:** Required

**Success Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

### 4. Get Current User
**Endpoint:** `GET /auth/me`

**Description:** Get currently authenticated user's profile

**Authentication:** Required

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Response (401):**
```json
{
  "message": "No token, authorization denied"
}
```

---

### 5. Update User Profile
**Endpoint:** `PUT /auth/profile`

**Description:** Update user profile information

**Authentication:** Required

**Request Body:**
```json
{
  "name": "John Updated",
  "email": "johnupdated@example.com"
}
```

**Success Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Updated",
    "email": "johnupdated@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "message": "Email already in use"
}
```

---

## Task Endpoints

### 6. Get All Tasks
**Endpoint:** `GET /tasks`

**Description:** Retrieve all tasks for the authenticated user with optional filters

**Authentication:** Required

**Query Parameters (Optional):**
- `status`: Filter by status (pending, in-progress, completed)
- `priority`: Filter by priority (low, medium, high)
- `search`: Search in title and description

**Example Request:**
```
GET /tasks?status=pending&priority=high&search=assignment
```

**Success Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Complete Assignment",
    "description": "Finish the frontend developer internship task",
    "status": "pending",
    "priority": "high",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "user": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

---

### 7. Get Single Task
**Endpoint:** `GET /tasks/:id`

**Description:** Retrieve a specific task by ID

**Authentication:** Required

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Complete Assignment",
  "description": "Finish the frontend developer internship task",
  "status": "pending",
  "priority": "high",
  "dueDate": "2024-12-31T00:00:00.000Z",
  "user": "507f1f77bcf86cd799439011",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Response (404):**
```json
{
  "message": "Task not found"
}
```

---

### 8. Create Task
**Endpoint:** `POST /tasks`

**Description:** Create a new task

**Authentication:** Required

**Request Body:**
```json
{
  "title": "Complete Assignment",
  "description": "Finish the frontend developer internship task",
  "status": "pending",
  "priority": "high",
  "dueDate": "2024-12-31"
}
```

**Validation Rules:**
- `title`: Required, max 100 characters
- `description`: Required, max 500 characters
- `status`: Optional, enum (pending, in-progress, completed), default: pending
- `priority`: Optional, enum (low, medium, high), default: medium
- `dueDate`: Optional, ISO 8601 date format

**Success Response (201):**
```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Complete Assignment",
    "description": "Finish the frontend developer internship task",
    "status": "pending",
    "priority": "high",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "user": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 9. Update Task
**Endpoint:** `PUT /tasks/:id`

**Description:** Update an existing task

**Authentication:** Required

**Request Body (all fields optional):**
```json
{
  "title": "Updated Assignment",
  "description": "Updated description",
  "status": "in-progress",
  "priority": "medium",
  "dueDate": "2024-12-30"
}
```

**Success Response (200):**
```json
{
  "message": "Task updated successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Updated Assignment",
    "description": "Updated description",
    "status": "in-progress",
    "priority": "medium",
    "dueDate": "2024-12-30T00:00:00.000Z",
    "user": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-16T14:20:00.000Z"
  }
}
```

---

### 10. Delete Task
**Endpoint:** `DELETE /tasks/:id`

**Description:** Delete a task

**Authentication:** Required

**Success Response (200):**
```json
{
  "message": "Task deleted successfully"
}
```

**Error Response (404):**
```json
{
  "message": "Task not found"
}
```

---

## Error Responses

### 400 Bad Request
Returned when validation fails or invalid data is provided.

### 401 Unauthorized
Returned when authentication is required but not provided or invalid.

### 404 Not Found
Returned when the requested resource does not exist.

### 500 Internal Server Error
Returned when an unexpected server error occurs.

---

## Postman Collection

### Import Instructions:
1. Open Postman
2. Click "Import" button
3. Paste the JSON below
4. Collection will be ready to use

### Postman Collection JSON:
```json
{
  "info": {
    "name": "TaskFlow API",
    "description": "Complete API collection for TaskFlow application",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Authentication",
      "item": [
        {
          "name": "Register User",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"John Doe\",\n  \"email\": \"john@example.com\",\n  \"password\": \"password123\"\n}"
            },
            "url": {
              "raw": "{{BASE_URL}}/auth/register",
              "host": ["{{BASE_URL}}"],
              "path": ["auth", "register"]
            }
          }
        },
        {
          "name": "Login User",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"john@example.com\",\n  \"password\": \"password123\"\n}"
            },
            "url": {
              "raw": "{{BASE_URL}}/auth/login",
              "host": ["{{BASE_URL}}"],
              "path": ["auth", "login"]
            }
          }
        },
        {
          "name": "Get Current User",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{BASE_URL}}/auth/me",
              "host": ["{{BASE_URL}}"],
              "path": ["auth", "me"]
            }
          }
        },
        {
          "name": "Update Profile",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"John Updated\",\n  \"email\": \"johnupdated@example.com\"\n}"
            },
            "url": {
              "raw": "{{BASE_URL}}/auth/profile",
              "host": ["{{BASE_URL}}"],
              "path": ["auth", "profile"]
            }
          }
        },
        {
          "name": "Logout",
          "request": {
            "method": "POST",
            "header": [],
            "url": {
              "raw": "{{BASE_URL}}/auth/logout",
              "host": ["{{BASE_URL}}"],
              "path": ["auth", "logout"]
            }
          }
        }
      ]
    },
    {
      "name": "Tasks",
      "item": [
        {
          "name": "Get All Tasks",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{BASE_URL}}/tasks",
              "host": ["{{BASE_URL}}"],
              "path": ["tasks"]
            }
          }
        },
        {
          "name": "Get All Tasks (Filtered)",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{BASE_URL}}/tasks?status=pending&priority=high&search=assignment",
              "host": ["{{BASE_URL}}"],
              "path": ["tasks"],
              "query": [
                {
                  "key": "status",
                  "value": "pending"
                },
                {
                  "key": "priority",
                  "value": "high"
                },
                {
                  "key": "search",
                  "value": "assignment"
                }
              ]
            }
          }
        },
        {
          "name": "Get Single Task",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{BASE_URL}}/tasks/:id",
              "host": ["{{BASE_URL}}"],
              "path": ["tasks", ":id"],
              "variable": [
                {
                  "key": "id",
                  "value": "507f1f77bcf86cd799439012"
                }
              ]
            }
          }
        },
        {
          "name": "Create Task",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Complete Assignment\",\n  \"description\": \"Finish the frontend developer internship task\",\n  \"status\": \"pending\",\n  \"priority\": \"high\",\n  \"dueDate\": \"2024-12-31\"\n}"
            },
            "url": {
              "raw": "{{BASE_URL}}/tasks",
              "host": ["{{BASE_URL}}"],
              "path": ["tasks"]
            }
          }
        },
        {
          "name": "Update Task",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Updated Assignment\",\n  \"status\": \"in-progress\",\n  \"priority\": \"medium\"\n}"
            },
            "url": {
              "raw": "{{BASE_URL}}/tasks/:id",
              "host": ["{{BASE_URL}}"],
              "path": ["tasks", ":id"],
              "variable": [
                {
                  "key": "id",
                  "value": "507f1f77bcf86cd799439012"
                }
              ]
            }
          }
        },
        {
          "name": "Delete Task",
          "request": {
            "method": "DELETE",
            "header": [],
            "url": {
              "raw": "{{BASE_URL}}/tasks/:id",
              "host": ["{{BASE_URL}}"],
              "path": ["tasks", ":id"],
              "variable": [
                {
                  "key": "id",
                  "value": "507f1f77bcf86cd799439012"
                }
              ]
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "BASE_URL",
      "value": "http://localhost:5000/api",
      "type": "string"
    }
  ]
}
```

---

## Testing with cURL

### Register User:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login User:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get All Tasks:
```bash
curl -X GET http://localhost:5000/api/tasks \
  -b cookies.txt
```

### Create Task:
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "Complete Assignment",
    "description": "Finish the frontend developer internship task",
    "status": "pending",
    "priority": "high",
    "dueDate": "2024-12-31"
  }'
```