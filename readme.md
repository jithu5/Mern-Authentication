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

CORS
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASS 

SENDER_EMAIL 

```
