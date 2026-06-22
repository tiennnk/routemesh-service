# RouteMesh Service

A NestJS microservices backend for a ride-hailing system, built by tiennnk (Tien Nguyen).

![CI](https://github.com/tiennnk/routemesh-service/actions/workflows/ci.yml/badge.svg)

## What This Project Includes

**Framework:** NestJS (TypeScript), microservices architecture with a single API Gateway entry point.

**Messaging:** RabbitMQ - gateway forwards all requests to internal services using request-response pattern via `ClientProxy.send()`.

**Auth:** Passport.js + JWT. Login returns a signed token; protected routes validate it through a global guard.

**Database:** PostgreSQL + TypeORM, shared across user, trip, and driver services.

**API Docs:** Swagger, auto-generated from decorators, available at `/api`.

**Infrastructure:** Docker Compose for PostgreSQL and RabbitMQ, GitHub Actions for CI, `.env.example` included.

## Architecture

All traffic enters through `api-gateway` on port 3000. From there, requests go to one of three services over RabbitMQ: `user-service` handles auth, `trip-service` owns the trip lifecycle, `driver-service` manages driver records. Services share a PostgreSQL database. Common DTOs and message patterns live in `libs/shared`.

## Run locally

Requires Docker and Node.js 20+.

```bash
docker compose up -d
npm install
cp .env.example .env
```

```bash
npm run start:dev user-service
npm run start:dev trip-service
npm run start:dev driver-service
npm run start:dev api-gateway
```

Swagger: `http://localhost:3000/api`

## Endpoints

Two public routes: login (`POST /auth/login`) returns a JWT, register (`POST /users`) creates an account. Every other route checks the token first.

Trips follow a lifecycle - a rider opens a request, a driver accepts it, the ride moves through its states (PENDING -> ACCEPTED -> IN_PROGRESS -> COMPLETED) until done or cancelled. Invalid transitions return `400`.

Drivers have a simple profile: register, look up, toggle availability, remove.

## Tests

```bash
npm test
npm run test:cov
```
