# MERN AUTHENTICATION

## Description

This project is a full-stack web application built using **Express**, **MongoDB**, and **React**. It implements a user authentication system with **JWT** (JSON Web Token) for secure, token-based authentication. The application allows users to register, log in, verify their email using an OTP, and reset their password using OTP verification.

---

## Technologies Used

- **Frontend**: React, Axios
- **Backend**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Email Verification & OTP**: Bravo (or any email service for OTP delivery)

---

## Features

1. **User Registration**: Allows users to create an account with email and password.
2. **Login**: Users can log in with email and password.
3. **Email Verification**: After registration, an OTP is sent to the user's email for email verification.
4. **Password Reset**: Users can request an OTP to reset their password, which is sent to their email.
5. **Password Change**: Users can change their password once they provide a valid OTP.
6. **Protected Routes**: Routes are protected using JWT, ensuring that only authenticated users can access specific resources.

---

## Project Setup & Installation

### Clone the Repository

```bash
    cd <repository>
```

### Client Folder

```bash
    cd client
    npm install
```

#### Set up environment variables in a .env file in server folder

```bash
VITE_SERVER_URL
```

---

### Server Folder

```bash
    cd server
    npm install
```

#### Set up environment variables in a .env file in server folder


```bash
PORT 

JWT_SECRET 

NODE_ENV

# Cross-Origin Resource Sharing (CORS)

CORS is a security feature implemented by web browsers that allows or restricts web applications running at one origin to make requests for resources from a different origin. 

## Why CORS is Important
- Enables secure cross-origin requests
- Prevents unauthorized access to resources
- Essential for modern web applications

## Common CORS Headers
- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Methods`
- `Access-Control-Allow-Headers`
- `Access-Control-Allow-Credentials`

## Implementation
Typically implemented in the backend using middleware (like the `cors` package in Node.js) to handle cross-origin requests properly and securely.

## Best Practices
1. Only allow specific origins that need access
2. Limit exposed headers to necessary ones
3. Configure appropriate methods and credentials
4. Consider security implications when setting up CORS
CORS
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASS 

SENDER_EMAIL 

```

## API Routes

### Auth


```bash
# User Registration
POST /api/auth/register
{
    "username": "user123",
    "email": "user@example.com",
    "password": "password123"
}

# User Login
POST /api/auth/login
{
    "email": "user@example.com",
    "password": "password123"
}

# Email Verification
POST /api/auth/verify-email
{
    "email": "user@example.com", # email will be get from database no need to enter email address
    "otp": "123456"
}

# Request Password Reset
POST /api/auth/forgot-password
{
    "email": "user@example.com"
}

# Reset Password with OTP
POST /api/auth/reset-password
{
    "email": "user@example.com", # email will be get from database no need to enter email address
    "otp": "123456",
    "newPassword": "newpass123"
}

# Change Password (Protected Route)
PUT /api/auth/change-password
{
    "currentPassword": "password123",
    "newPassword": "newpass123"
}

# Home Route (Public)
GET /api/
Returns: Welcome message and API status

```bash
# Get API Status
GET /api/
Response: {
    "message": "Welcome to the API",
    "status": "running"
}
```