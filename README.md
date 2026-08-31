# Prisma DB Generator

A Node.js Express REST API server that uses Prisma as its ORM and Claude Code as an AI agent to generate all database models, controllers, routes, seed data, and Postman documentation — all from a single database relationship diagram.

You supply a diagram. Claude does the rest.

---

## What It Does

1. You provide a database relationship diagram (image, sketch, or text description)
2. Claude reads the diagram and generates all Prisma model files
3. Claude runs migrations and regenerates the Prisma client
4. Claude scaffolds typed controllers and Express routes for every model
5. Claude seeds the database with realistic sample data
6. Claude produces a ready-to-import Postman collection covering all endpoints

The result is a fully working REST API with zero boilerplate written by hand.

---

## Prerequisites

- [Node.js LTS](https://nodejs.org/) (latest LTS release)
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) — Anthropic's agentic coding CLI

---

## Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd prisma-db-generator
npm install
```

---

## Setup

Copy the example environment file and fill in any required values:

```bash
cp .env.example .env
```

The default `.env` only requires a database URL for SQLite, which is already pre-configured. No changes are needed to get started.

---

## Running the Server

```bash
npm run start
```

The server starts on **http://localhost:3000**.

---

## Generating Your API from a Diagram

This is the core workflow. Make sure Claude Code is installed before proceeding.

### Step 1 — Start a Claude Code session

From the project root:

```bash
claude
```

### Step 2 — Supply your diagram

You can provide your database relationship diagram in any of these formats:

- **Image file** — drag and drop or attach a `.png`, `.jpg`, or `.pdf` of your ERD or diagram into the Claude Code session
- **Sketch or whiteboard photo** — a photo of a hand-drawn diagram works fine
- **Text description** — describe your entities and relationships in plain language, for example:

```
A User has many Orders.
An Order has many OrderItems.
An OrderItem belongs to a Product.
Products have a name, price, and stock quantity.
```

### Step 3 — Instruct Claude to run the agent

Once your diagram is supplied, tell Claude:

```
Read the diagram and follow AGENT.md to scaffold the full API.
```

Claude will work through every step automatically:

| Step | What happens                                                |
| ---- | ----------------------------------------------------------- |
| 1    | Reads and interprets the diagram                            |
| 2    | Creates Prisma model files in `prisma/models/`              |
| 3    | Verifies `schema.prisma` is correct                         |
| 4    | Runs `npm run prisma:migrate` and `npm run prisma:generate` |
| 5    | Creates controllers in `src/controllers/`                   |
| 6    | Creates routes in `src/routes/`                             |
| 7    | Registers all routes in `src/index.ts`                      |
| 8    | Creates seed files in `src/seeds/`                          |
| 9    | Registers seeds and runs `npm run prisma:seed`              |
| 10   | Generates `postman_collection.json` in the project root     |
| 11   | Starts the server and verifies all endpoints                |

### Step 4 — Import the Postman collection

Once Claude finishes, import the generated collection into Postman:

1. Open Postman
2. Click **Import**
3. Select `postman_collection.json` from the project root
4. All routes are pre-configured with example request bodies and the `{{baseUrl}}` variable set to `http://localhost:3000`

---

## Available Scripts

| Script          | Command                   | Description                                   |
| --------------- | ------------------------- | --------------------------------------------- |
| Start server    | `npm run start`           | Runs the Express server with `tsx`            |
| Migrate         | `npm run prisma:migrate`  | Applies schema changes to the SQLite database |
| Generate client | `npm run prisma:generate` | Regenerates the typed Prisma client           |
| Seed database   | `npm run prisma:seed`     | Populates the database with sample data       |

---

## Project Structure

```
prisma/
  schema.prisma           # Master Prisma schema (generator + datasource)
  models/                 # One .prisma file per model
  migrations/             # Auto-generated migration history
src/
  controllers/            # One controller class per model
  routes/                 # One route file per model
  seeds/                  # One seed file per model + initSeeding.ts
  index.ts                # App entrypoint, Prisma client instance
generated/prisma/         # Auto-generated Prisma client (do not edit)
postman_collection.json   # Generated Postman collection
AGENT.md                  # Claude Code instructions for scaffolding
dev.db                    # SQLite database file
```

---

## REST API Conventions

Every generated model exposes the following endpoints:

| Method   | Path            | Description                 |
| -------- | --------------- | --------------------------- |
| `GET`    | `/<models>`     | Fetch all records           |
| `GET`    | `/<models>/:id` | Fetch a single record by ID |
| `POST`   | `/<models>`     | Create a new record         |
| `PUT`    | `/<models>/:id` | Update an existing record   |
| `DELETE` | `/<models>/:id` | Delete a record             |

---

## Tech Stack

| Layer     | Technology                  |
| --------- | --------------------------- |
| Runtime   | Node.js (LTS)               |
| Framework | Express 5                   |
| ORM       | Prisma 7                    |
| Database  | SQLite (via better-sqlite3) |
| Language  | TypeScript                  |
| AI Agent  | Claude Code                 |
# gratissimo-api-sqlite
