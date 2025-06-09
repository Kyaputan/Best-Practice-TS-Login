# 🔐 Backend API Authentication with Node.js, Express & MongoDB

โปรเจกต์นี้เป็นระบบ Backend API สำหรับการยืนยันตัวตน (Authentication) พัฒนาด้วย **Node.js**, **Express**, และ **TypeScript** ใช้ฐานข้อมูล **MongoDB** พร้อมระบบรักษาความปลอดภัยด้วย **JWT** และการเข้ารหัสรหัสผ่านด้วย **Bcrypt**

---

## ✨ Features
- ✅ สมัครสมาชิก / เข้าสู่ระบบ / อัปเดตข้อมูล / ลบบัญชีผู้ใช้
- 🔐 ยืนยันตัวตนด้วย JWT และใช้ Middleware ป้องกัน Protected Routes
- 🔑 เข้าสหัสรหัสผ่านด้วย bcryptjs
- 📏 ตรวจสอบข้อมูลที่รับเข้ามาด้วย Zod
- 🛡️ Role-Based Access Control ด้วย Middleware
- 📁 แบ่งโครงสร้างโค้ดชัดเจน: Routes, Controllers, Models, Middleware

---

## 🛠️ Technologies Used
- **Backend**: Node.js, Express.js
- **Language**: TypeScript
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (jsonwebtoken, express-jwt)
- **Hashing**: bcryptjs
- **Validation**: zod
- **Environment Config**: dotenv
- **Dev Tools**: nodemon, ts-node

---

## 🚀 Getting Started

### ✅ Requirements
- Node.js v18+
- MongoDB (Local หรือ Cloud เช่น MongoDB Atlas)

### 📦 Installation
```bash
git clone Best-Practice-TS-Login
cd Best-Practice-TS-Login
npm install
```

### ⚙️ Environment Variables
สร้าง `.env` ที่ root ของโปรเจกต์:

```env
PORT=8000
DATABASE_URL=mongodb://localhost:27017/mydatabase
JWT_SECRET=your_super_secret_key
BCRYPT_SALT_ROUNDS=10
```

### ▶️ Start Development Server
```bash
npm run dev
```
Server จะรันที่ `http://localhost:8000`

---

## 🛣️ API Endpoints

### `POST /auth/register` - สมัครสมาชิก
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

### `POST /auth/login` - เข้าสู่ระบบ
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

### `PATCH /auth/update` - อัปเดตข้อมูล (ต้องแนบ JWT)
**Headers:**
```
Authorization: Bearer <token>
```
```json
{
  "password": "password123",
  "username": "new_username",
  "newpassword": "newpassword456"
}
```

### `DELETE /auth/delete` - ลบบัญชีผู้ใช้ (ต้องแนบ JWT)
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

### `GET /auth/logout` - ออกจากระบบ (ต้องแนบ JWT)

---

## 📁 Project Structure
```
src/
├── config/             # Environment settings
│   ├── env.ts
│   └── env.interfaces.ts
├── controllers/        # Main logic
│   ├── auth.controller.ts
│   └── ServerCheck.ts
├── database/           # DB connection
│   └── db.ts
├── interfaces/         # Types & Zod schemas
│   └── auth.interfaces.ts
├── middleware/         # Middleware logic
│   └── auth.middleware.ts
├── models/             # Mongoose schemas
│   └── User.ts
├── routes/             # API routes
│   └── auth.route.ts
├── utils/              # Utility functions
│   └── hash.util.ts
└── server.ts           # Entry point
```

---

> 🧪 เหมาะสำหรับการเรียนรู้ และสามารถต่อยอดเป็นระบบยืนยันตัวตนในโปรเจกต์จริงได้
