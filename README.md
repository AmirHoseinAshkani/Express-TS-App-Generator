# Express TS App Generator

A minimal and easy-to-use generator for bootstrapping **Express.js** projects with **TypeScript** support out of the box.  
This package helps developers save time by setting up a clean project structure, installing essential dependencies, and providing ready-to-use configuration files.

---

## 🚀 Features
- ⚡ Quickly generate a new Express + TypeScript project.
- 🏗 Pre-configured **TypeScript** with `tsconfig.json`.
- 🔥 Integrated **Express.js** boilerplate.
- 🌿 Environment variables handled with **dotenv**.
- 🧩 Simple and extensible folder structure.

---

## 📦 Packages Used

These are the packages that the generated app will include.

### 1) Runtime dependencies (always installed)
- **express** – Minimal, fast web framework for building HTTP APIs and servers.
- **cors** – Express middleware to enable/handle Cross-Origin Resource Sharing.
- **helmet** – Security middleware that sets sensible HTTP headers.

### 2) Optional database dependencies
- **mongoose** *(MongoDB)* – ODM for MongoDB; schema/model layer + helpers for queries/validation.
- **pg** *(PostgreSQL)* – Official PostgreSQL client for Node.js.
- **pg-hstore** *(PostgreSQL)* – Serializer/parser for PostgreSQL `hstore` data type (commonly used by ORMs like Sequelize; if you don’t use `hstore`, you might not need it).

### 3) DevDependencies (always installed)
- **eslint** – Pluggable linter to catch problems and enforce code style.
- **prettier** – Opinionated code formatter for consistent styling.

### 4) DevDependencies (only when **TypeScript** is chosen)
- **typescript** – TypeScript compiler and language services.
- **ts-node** – Execute TypeScript files directly in Node (useful for scripts/CLIs).
- **tsx** – Fast TS/ESM runner (used in the `dev` script to run `src/index.ts` without manual build).
- **@types/node** – Type definitions for Node.js APIs.
- **@types/express** – Type definitions for Express.
- **@types/cors** – Type definitions for `cors`.
- **@types/helmet** – Type definitions for `helmet`.

> ℹ️ Notes  
> - The generator writes `package.json` with `dev`, `build`, and `start` scripts. For TypeScript: `dev` uses **tsx**, `build` uses **tsc**, and `start` runs the compiled output.  
> - `.gitignore` includes `node_modules`, `dist`, and `.env` by default.

---

## 🔧 Installation

You can use this package in two ways:

### 1. Using `npx` (recommended)
Run the generator directly without installing globally:

- npx express-ts-app-generator my-app
- This will create a new folder called my-app with all files scaffolded.


### 2. Installing globally `-g`

- If you want to use the CLI command without npx


- npm install -g express-ts-app-generator


- Then you can generate a project with:
- express-ts-app-generator my-app

🛠 Usage

- Once the project is generated:

`cd` my-app
npm install
npm run dev



This will start the development server with ts-node-dev (or whichever runner you configured).
❓ Why use this generator?

Setting up Express.js with TypeScript manually can be repetitive:

    Creating and configuring tsconfig.json

    Installing and setting up express with proper typings

    Configuring dotenv for environment variables

    Defining folder structure (src/, routes/, controllers/, etc.)

    Writing the boilerplate server.ts

👉 This generator automates all those steps, so you can focus on writing actual application logic instead of repeating setup tasks.


📂 Project Structure (generated)

my-app/
├── src/
│   ├── index.ts        # Entry point
│   ├── routes/         # Example routes
│   ├── controllers/    # Example controllers
│
├── tsconfig.json
├── package.json
├── .env.example


📜 License

MIT © 2025 [`AmirHosein Ashkani`]