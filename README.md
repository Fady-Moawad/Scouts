## 🔐 Authentication System API

A secure and scalable REST API for user authentication built with **Node.js**, **Express.js**, and **MongoDB**.

Designed with security, clean architecture, and backend best practices in mind.



---

## ✨ Features

* ✅ User Registration
* ✅ Email Verification (OTP)
* ✅ JWT Authentication
* ✅ Secure Login
* ✅ Forgot Password
* ✅ Reset Password
* ✅ Password Hashing using bcrypt
* ✅ Role-Based Authorization (Admin/User)
* ✅ Pagination
* ✅ Rate Limiting
* ✅ Input Validation
* ✅ Express Async Handler
* ✅ Centralized Error Handling
* ✅ Email Sending with Nodemailer
* ✅ Environment Variables
* ✅ Helmet Security
* ✅ CORS
* ✅ Morgan Logger
* ✅ Database Seeder

---

## 🛠️ Tech Stack

| Backend               | Database | Security   | Utilities  |
| --------------------- | -------- | ---------- | ---------- |
| Node.js               | MongoDB  | JWT        | Nodemailer |
| Express.js            | Mongoose | bcrypt     | dotenv     |
| Express Async Handler |          | Helmet     | Morgan     |
| Express Validator     |          | Rate Limit |            |

---

## 📂 Project Structure

```text
Authentication-System
│
├── config
│   └── connectDB.js
│
├── controllers
│   └── userControls.js
│
├── middleware
│   ├── errorHandling.js
│   ├── rateLimiter.js
│   ├── rateLimiterLogin.js
│   ├── validationRegister.js
│   └── verifyToken.js
│
├── models
│   └── userModel.js
│
├── routes
│   └── userRoutes.js
│
├── utils
│   ├── calcExpireDate.js
│   └── nodemailer.js
│
├── Data
│
├── seed
│   └── addUsers.js
│
├── .env.example
├── server.js
└── package.json
```

---

# 🔄 Authentication Flow

Register
     │
     ▼
Create Account
     │
     ▼
Send Verification Code
     │
     ▼
Verify Account
     │
     ▼
Generate JWT Token
     │
     ▼
Login


---

## 📌 API Endpoints

| Method | Endpoint                    | Description              |
| :----: | --------------------------- | ------------------------ |
|   GET  | `/api/users`                | Get all users (Admin)    |
|  POST  | `/api/users/register`       | Register new user        |
|  POST  | `/api/users/login`          | Login                    |
|  POST  | `/api/users/verifyaccount`  | Verify account           |
|  POST  | `/api/users/resendcode`     | Resend verification code |
|  POST  | `/api/users/forgetpassword` | Send password reset code |
|  POST  | `/api/users/resetpassword`  | Reset password           |

---

# 🔒 Security Features

* Password hashing using **bcrypt**
* JWT Authentication
* Email Verification
* Password Reset Expiration
* Verification Code Expiration
* Role-Based Authorization
* Login Rate Limiting
* Password Recovery Rate Limiting
* Helmet Security Headers
* Input Validation
* Centralized Error Handling

---

# 🚀 Getting Started

### 1️⃣ Clone the repository
git clone https://github.com/Fady-Moawad/auth-system.git


### 2️⃣ Navigate to the project
cd auth-system

### 3️⃣ Install dependencies
npm install

### 4️⃣ Configure environment variables
Create a `.env` file and copy the following:

PORT=5000
NODE_ENV=development
MONGOOSE_URL=your_mongodb_connection
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
SALT=10

### 5️⃣ Start the server

Development
npm run dev

Production

npm start

### 6️⃣ Seed the database (Optional)
npm run seed


# 📮 Example Request

### Register

POST /api/users/register

json
{
    "name":"Ali",
    "email":"Ali@gmail.com",
    "password":"password!"
}

---

### Login

POST /api/users/login

json
{
    "email":"Ali@gmail.com",
    "password":"password!"
}


---

# 📈 Future Improvements

* Refresh Token Authentication
* Swagger Documentation
* Docker Support
* Unit Testing
* Integration Testing
* OAuth (Google / GitHub)
* CI/CD Pipeline

---

# 👨‍💻 Author

**Fady Moawad**

Computer Science Student • Backend Developer

---

# ⭐ Support

If you found this project helpful, consider giving it a **⭐ Star** on GitHub.
