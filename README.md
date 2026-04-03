# Travel Tracker API

`travel_tracker` is a NestJS REST API for managing personal travel destinations. It provides user registration and login with JWT-based authentication, then lets authenticated users create, view, update, and delete their own travel plans.

## Overview

This project is built for a simple travel-planning workflow:

- Register a user account with email and password
- Sign in to receive a JWT access token
- Create and manage destination records tied to the authenticated user
- Store application data in PostgreSQL through Prisma ORM

## Tech Stack

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Passport JWT authentication
- Class Validator / Class Transformer
- Jest for unit and e2e testing

## Features

- Secure user registration with hashed passwords using `bcrypt`
- JWT-based login flow
- Route protection with a custom `JwtAuthGuard`
- Destination ownership enforced per authenticated user
- Request validation using Nest global `ValidationPipe`
- Prisma-powered database access with PostgreSQL

## Project Structure

```text
src/
  auth/               Authentication module, DTOs, JWT strategy
  destinations/       Destination CRUD module and DTOs
  prisma_mod/         Prisma client service and module
  app.module.ts       Root module configuration
  main.ts             Application bootstrap

prisma/
  schema.prisma       Database schema
  migrations/         Prisma migrations
```

## Environment Variables

Create a `.env` file in the project root with the following values:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require
JWT_SECRET=replace_with_a_strong_secret
PORT=3000
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the database

Make sure your PostgreSQL database is running and `DATABASE_URL` points to it.

### 3. Apply Prisma migrations

```bash
npx prisma migrate dev
```

If you only want to generate the Prisma client:

```bash
npx prisma generate
```

### 4. Start the application

```bash
npm run start:dev
```

The API runs on `http://localhost:3000` by default.

## Available Scripts

```bash
# development
npm run start
npm run start:dev
npm run start:debug

# production
npm run build
npm run start:prod

# quality
npm run lint
npm run format

# tests
npm run test
npm run test:watch
npm run test:cov
npm run test:e2e
```

## Database Models

### User

- `id`
- `email`
- `password`
- `createdAt`
- `updatedAt`

### Destination

- `id`
- `name`
- `travelDate`
- `notes`
- `createdAt`
- `updatedAt`
- `userId`

Each destination belongs to exactly one user.

## API Endpoints

### Base URL

```text
http://localhost:3000
```

### Health / Default Route

```http
GET /
```

Response:

```json
"Hello World!"
```

### Authentication

#### Register

```http
POST /auth/register
Content-Type: application/json
```

Request body:

```json
{
  "email": "user@example.com",
  "password": "secret123"
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json
```

Request body:

```json
{
  "email": "user@example.com",
  "password": "secret123"
}
```

Successful login returns user data plus a JWT token.

### Destinations

All destination routes require:

```http
Authorization: Bearer <jwt_token>
```

#### Create destination

```http
POST /destinations/create
Content-Type: application/json
Authorization: Bearer <jwt_token>
```

Request body:

```json
{
  "name": "Tokyo",
  "travelDate": "2026-12-15T00:00:00.000Z",
  "notes": "Visit Shibuya and Kyoto after arrival."
}
```

#### Get all destinations

```http
GET /destinations
Authorization: Bearer <jwt_token>
```

#### Get destination by ID

```http
GET /destinations/:id
Authorization: Bearer <jwt_token>
```

#### Update destination

```http
PATCH /destinations/update/:id
Content-Type: application/json
Authorization: Bearer <jwt_token>
```

Request body example:

```json
{
  "name": "Tokyo, Japan",
  "notes": "Updated itinerary"
}
```

#### Delete destination

```http
DELETE /destinations/delete/:id
Authorization: Bearer <jwt_token>
```

## Validation Rules

- `email` must be a valid email address
- `password` must be at least 6 characters
- `name` is required for destination creation
- `travelDate` must be a valid ISO date string
- `notes` is optional

## Authentication Flow

1. Register a user with `/auth/register`
2. Log in through `/auth/login`
3. Copy the returned JWT token
4. Send the token in the `Authorization` header for protected routes

## Sample cURL Commands

### Register

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"user@example.com\",\"password\":\"secret123\"}"
```

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"user@example.com\",\"password\":\"secret123\"}"
```

### Create Destination

```bash
curl -X POST http://localhost:3000/destinations/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d "{\"name\":\"Tokyo\",\"travelDate\":\"2026-12-15T00:00:00.000Z\",\"notes\":\"Visit Shibuya and Kyoto after arrival.\"}"
```

### Get All Destinations

```bash
curl http://localhost:3000/destinations \
  -H "Authorization: Bearer <your_token>"
```

### Get Destination By ID

```bash
curl http://localhost:3000/destinations/1 \
  -H "Authorization: Bearer <your_token>"
```

### Update Destination

```bash
curl -X PATCH http://localhost:3000/destinations/update/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d "{\"name\":\"Tokyo, Japan\",\"notes\":\"Updated itinerary\"}"
```

### Delete Destination

```bash
curl -X DELETE http://localhost:3000/destinations/delete/1 \
  -H "Authorization: Bearer <your_token>"
```

## Notes

- Passwords are hashed before storage
- JWT tokens expire in `1h`
- Users can only access their own destination records
- Prisma uses the PostgreSQL adapter configured from `DATABASE_URL`
