# كشافة الراعي

نظام ويب بسيط لإدارة بيانات الأفراد وتسجيل الحضور باستخدام QR Code.

## فكرة المشروع

المشروع يهدف إلى تسهيل عملية تسجيل الحضور بدلًا من التسجيل اليدوي، من خلال QR Code لكل فرد، مع إمكانية متابعة الحضور من خلال Dashboard.

## Features

- تسجيل الدخول باستخدام JWT
- تسجيل واستكمال بيانات الأفراد
- QR Code لكل فرد
- تسجيل الحضور
- منع تكرار تسجيل الحضور
- Dashboard لإحصائيات الحضور
- حساب الحضور والغياب ونسبة الحضور
- فلترة البيانات حسب الفريق
- Responsive Design
- REST API

## Technologies

### Frontend
- HTML
- CSS
- Bootstrap
- JavaScript
- jQuery
- Chart.js

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT

## Project Structure

```text
كشافة الراعي/
│
├── FrontEnd/
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   ├── user.html
│   ├── completeData.html
│   ├── attendance.html
│   ├── css/
│   ├── js/
│   └── assets/
│
└── BackEnd/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── middleware/
    │   └── ...
    ├── .env
    ├── package.json
    └── server.js