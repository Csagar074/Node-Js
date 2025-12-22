
# 🚲 PR-4 Bike CRUD Application

A simple **Bike Management CRUD Web Application** built using **Node.js, Express, MongoDB, and EJS**.
This project allows users to **Add, View, Edit, and Delete bike records** with server-side rendered pages.

---

## 📸 Preview

Below are some screenshots of the application:

### 🏠 Home / Bike Listing Page
<img src="public/img/Home Page.png" alt="Bike Listing Page" width="100%">

---

### ➕ Add Bike Form
<img src="public/img/Add Bike Form.png" alt="Add Bike Form" width="100%">

---

### ✏️ Edit Bike Page
<img src="public/img/Edit Page.png" alt="Edit Bike Page" width="100%">

---

## ✨ Features

- Create, Read, Update, Delete (CRUD) operations
- Server-side rendering using EJS
- MongoDB database integration with Mongoose
- Clean project structure
- Simple UI with CSS
- Image support via path/URL

---

## 🧰 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- CSS
- Nodemon

---

## 📁 Folder Structure

PR-4 BIKE CRUD/
│
├── Config/
│   └── db.config.js
│
├── model/
│   └── Bike.model.js
│
├── node_modules/
│
├── public/
│   └── style.css
│
├── views/
│   ├── images/
│   ├── edit.ejs
│   ├── form.ejs
│   └── viewbike.ejs
│
├── package.json
├── package-lock.json
├── server.js
└── README.md

---

## 🗃️ Data Model (Bike)

| Field Name  | Type   | Required |
|------------|--------|----------|
| bike_image | String | Yes |
| bike_name  | String | Yes |
| bike_brand | String | Yes |
| bike_price | Number | Yes |
| bike_color | String | Yes |
| bike_engine| Number | Yes |
| bike_launch| Number | Yes |

---

## ⚙️ Installation & Setup

1. Install dependencies:
   npm install

2. Start MongoDB (default port 27017)

3. Run the project:
   node server.js
   OR
   npx nodemon server.js

4. Open browser:
   http://localhost:8001

---

## 👨‍💻 Author

Sagar Chavda

---

## 📜 License

This project is for learning purposes.
