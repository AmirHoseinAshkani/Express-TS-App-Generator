#!/usr/bin/env node
import inquirer from "inquirer";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
async function main() {
  console.log("🚀 Welcome to Express-TS-App-Generator");
  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "📦 Enter your project name:",
      default: "express-app",
    },
  ]);
  const projectPath = path.join(process.cwd(), projectName);
  if (fs.existsSync(projectPath)) {
    console.error("❌ Directory already exists. Choose another name.");
    process.exit(1);
  }
  fs.mkdirSync(projectPath);
  const { language } = await inquirer.prompt([
    {
      type: "list",
      name: "language",
      message: "🌐 Choose a language:",
      choices: ["TypeScript", "JavaScript"],
    },
  ]);
  const { database } = await inquirer.prompt([
    {
      type: "list",
      name: "database",
      message: "🗄️ Choose a database:",
      choices: ["None", "MongoDB", "PostgreSQL"],
    },
  ]);
  const pkg = {
    name: projectName,
    version: "1.0.0",
    main: language === "TypeScript" ? "dist/index.js" : "src/index.js",
    scripts: {
      dev: language === "TypeScript" ? "tsx src/index.ts" : "node src/index.js",
      build: language === "TypeScript" ? "tsc" : "echo 'No build step'",
      start:
        language === "TypeScript" ? "node dist/index.js" : "node src/index.js",
    },
  };
  fs.writeFileSync(
    path.join(projectPath, "package.json"),
    JSON.stringify(pkg, null, 2)
  );
  // Dependencies
  const deps = ["express", "cors", "helmet"];
  if (database === "MongoDB") deps.push("mongoose");
  if (database === "PostgreSQL") deps.push("pg", "pg-hstore");
  // DevDependencies
  const devDeps = ["eslint", "prettier"];
  if (language === "TypeScript") {
    devDeps.push(
      "typescript",
      "ts-node",
      "tsx",
      "@types/node",
      "@types/express",
      "@types/cors",
      "@types/helmet"
    );
  }
  console.log("📦 Installing dependencies...");
  execSync(`npm install ${deps.join(" ")}`, {
    cwd: projectPath,
    stdio: "inherit",
  });
  console.log("📦 Installing devDependencies...");
  execSync(`npm install -D ${devDeps.join(" ")}`, {
    cwd: projectPath,
    stdio: "inherit",
  });
  const srcPath = path.join(projectPath, "src");
  fs.mkdirSync(srcPath);
  const entryFile =
    language === "TypeScript"
      ? path.join(srcPath, "index.ts")
      : path.join(srcPath, "index.js");
  const serverCode = `
import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from ${language} Express!");
});

app.listen(3000, () => {
  console.log("✅ Server is running on http://localhost:3000");
});
`;
  fs.writeFileSync(entryFile, serverCode.trim());
  if (language === "TypeScript") {
    const tsConfig = {
      compilerOptions: {
        target: "ESNext",
        module: "ESNext",
        moduleResolution: "Node",
        outDir: "dist",
        esModuleInterop: true,
        strict: true,
        skipLibCheck: true,
      },
      include: ["src"],
    };
    fs.writeFileSync(
      path.join(projectPath, "tsconfig.json"),
      JSON.stringify(tsConfig, null, 2)
    );
  }
  // gitignore
  const gitignore = `
node_modules
dist
.env
`;
  fs.writeFileSync(path.join(projectPath, ".gitignore"), gitignore.trim());
  console.log("🎉 Project setup complete!");
  console.log(`👉 cd ${projectName} && npm run dev`);
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
