#  Library Management System

This is a Library Management System built with **TypeScript**, **Express.js**, and **MongoDB** using **Mongoose** as the ODM.

It has two main sections:
-  Book Management
-  Borrowing System

We used `.env` for secure environment variable management, and tested API routes using **Postman** and **MongoDB Compass** for database visualization.

---

##  Features

- Book CRUD
- Book filtering by genre and sorting
- Borrowing books with due date
- Automatic availability update when books are borrowed
- Aggregation pipeline for borrow summary
- Schema validation & error handling
- Static and instance methods in Mongoose
- Middleware usage (pre-save)
- Environment variable support

---

##  Project Structure
dist
    all js file
src
    app
        controllers
        interfaces
        models
        routes
    app.ts
    server.ts
    etc

package.json
tsconfig.json

## all api

POST /api/books

GET /api/books

GET /api/books/:id

PUT /api/books/:id

DELETE /api/books/:id

Borrow
    OST /api/borrow

    GET /api/borrow 
 

