
# To-Do App (Frontend & Backend)

This is a simple To-Do app that consists of two parts:
1. **Frontend**: Built with **Next.js** .
2. **Backend**: Built with **Node.js** (Express.js) and **Prisma ORM** for database interactions.

This application allows users to manage tasks, which includes CRUD operations (Create, Read, Update, Delete). It supports user registration, login, and task management.

---

## Table of Contents

1. [Project Setup](#project-setup)
2. [Frontend](#frontend)
3. [Backend](#backend)



---

## Project Setup

To run both the **frontend** and **backend** of the application, follow these steps:

### Prerequisites

- **Node.js**: Make sure that Node.js is installed on your machine. You can download it from [Node.js Official Site](https://nodejs.org/).
- **Yarn or npm**: Install either Yarn or npm (Node package manager) to manage dependencies.

### Clone the repository:

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app

```
### Frontend Setup
Navigate to the frontend folder:
```bash
cd frontend

```
### Install the frontend dependencies:
```bash
npm install  
```
### Run the frontend development server:

```bash
npm run dev   # Or `yarn dev`
```
### The frontend should now be running at http://localhost:3000.

### Backend Setup
### Navigate to the backend folder:

```bash
cd ../backend
```
### Install the backend dependencies:

```bash
npm install   # Or `yarn install` if you're using Yarn
```
### Configure environment variables: Create a .env file in the backend folder and configure the necessary environment variables:

```bash
DATABASE_URL="your-database-connection-string"
JWT_SECRET="your-jwt-secret"
```
### Run Prisma migration:
```bash
npx prisma migrate dev
```
### Start the backend server:

```bash
npm start   # Or `yarn start`
```
### The backend should now be running at http://localhost:5000.

### Open the Application
Now, you can visit http://localhost:3000 to interact with the To-Do app.
The backend API is accessible at http://localhost:5000.

## Frontend
The frontend is built with Next.js (React.js). It interacts with the backend API to manage tasks.

## Key Features:
User Registration and Login
View Tasks
Add, Edit, Delete Tasks
Filter Tasks by Status (e.g., Pending, Done)
Show Due Dates and Task Statuses
Running Frontend Locally
Make sure the backend is running locally before you start the frontend.

### To run the frontend:

### Open a terminal and navigate to the frontend directory.

### Run the following command to install the necessary dependencies:

```bash
npm install
```
After the dependencies are installed, run the development server:

```bash
npm run dev
```
The frontend should now be available at http://localhost:3000.

## Backend
The backend is built with Node.js and Express. It connects to a database using Prisma ORM.

### Key Features:
User authentication (Register, Login)
Task management (CRUD)
CORS enabled for cross-origin requests
Running Backend Locally
Make sure the database is set up correctly. You can use Prisma to migrate the database:

Open a terminal and navigate to the backend directory.

### Install the backend dependencies:

```bash
npm install
```
### Configure the environment variables in .env file.

### Run the Prisma migration:

```bash
npx prisma migrate dev
```
### Start the backend server:

```bash
npm start
```
### The backend should now be available at http://localhost:5000.


- **License**: MIT License for the project.

This updated `README.md` now includes all the detailed setup instructions and descriptions for both frontend and backend.

Let me know if you need any further modifications!
