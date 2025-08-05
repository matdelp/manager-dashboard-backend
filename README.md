# 📊 Managers Dashboard Backend – NestJS API

This is a secure **NestJS backend API** developed for managing challenges created by managers in a coding bootcamp platform. It complements an existing Express-based backend and shares the same MongoDB database. This backend is specifically built for integration with a **Next.js manager dashboard**.

> ✅ Built as part of the **Code Labs Academy** full-stack bootcamp coursework.

---

## Features

- **JWT-based authentication and role-based authorization**
- **MongoDB integration** using `@nestjs/mongoose`
- Full **CRUD API** for managing challenges
- **DTO-based validation** with `class-validator`
- **Custom decorators** to handle authenticated users and role filtering

---

## Tech Stack

- **NestJS** – modular backend framework
- **MongoDB** – document-based database (shared with Express app)
- **Mongoose** – ODM for MongoDB
- **JWT** – secure token-based authentication
- **TypeScript** – type-safe codebase

---

## API Endpoints

All routes require an Authorization: Bearer <token> header with a valid JWT.
Challenge Management
| Method | Endpoint          | Description            | Role    |
| ------ | ----------------- | ---------------------- | ------- |
| GET    | `/challenges`     | Get all challenges     | Manager |
| GET    | `/challenges/:id` | Get a challenge by ID  | Manager |
| POST   | `/challenges`     | Create a new challenge | Manager |
| PATCH  | `/challenges/:id` | Update a challenge     | Manager |
| DELETE | `/challenges/:id` | Delete a challenge     | Manager |

---

 Authentication Flow

    Managers receive their JWT token from the Express-based backend via login.

    They must include the token in the Authorization header when making requests to this API.

    The token is verified using @nestjs/jwt, and roles are checked against controller-level metadata using a custom @Roles() decorator and guard.

Custom Decorators

    @AuthenticatedUser() – injects the authenticated user's info (id, role) into controller methods.

---

Author

Mathilde Delpeuch
Full-stack Web Development Student – Code Labs Academy
GitHub – @matdelp

