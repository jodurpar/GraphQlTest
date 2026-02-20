# GraphQlText - Remastered 🚀

A modern GraphQL API built with **Fastify**, **GraphQL Yoga** y **Pothos**, siguiendo los más altos estándares de ingeniería de software: **SOLID, KISS, DRY y Clean Code**.

**Repository**: [https://github.com/jodurpar/GraphQlTest](https://github.com/jodurpar/GraphQlTest)

This API allows querying SQL Server instances to retrieve information from databases and tables in a dynamic and secure way.

## ✨ Remasterization Features
- **SOLID Architecture**: Total decoupling using Dependency Injection (`tsyringe`).
- **Code-First Architecture**: The GraphQL schema is automatically generated from TypeScript code with **Pothos**.
- **Security**: Protection against **SQL Injection** using typed repositories and input sanitization (`[dbSafe]`).
- **Flexible & Dynamic**: Retrieve data from any table with support for pagination (`limit`, `offset`) and optional column filtering (`field`).
- **Docker Ready**: Optimized multi-stage Dockerfile for Node.js 20 with root-level configuration.
- **VS Code Ready**: Includes debug configurations, recommended extensions, and formatting settings.

## 📁 Project Structure
- `./GraphQlTest`: Main TypeScript source code folder.
- `./.vscode`: Editor configurations, recommended extensions, and debugging.
- `docker-compose.yml` & `dockerfile`: Deployment configuration at the root.
- `TestMe.md`: Quick manual testing guide.

## 🚀 Getting Started

### Prerequisites
- Node.js v20+ (or Docker)
- SQL Server

### Local Installation
```bash
# Enter the project folder
cd GraphQlTest

# Install dependencies
npm install

# Start in development mode (tsx watch)
npm run dev
```

### 👩‍💻 Using VS Code
The project includes an optimized `.vscode` folder:
- **Debugging**: Press F5 or use the "Run and Debug" tab to start the local server with breakpoints.
- **Formatting**: Prettier and ESLint configured to run automatically on save.
- **Extensions**: Automatic recommendations for GraphQL, Docker, and ESLint.

### 🐳 Docker Deployment
The application is ready to run in containers from the root directory.

```bash
# From the main directory (where this README is located)
docker-compose up -d --build
```
The API will be available at `http://localhost:15250/graphql`.

## 🔍 Query Examples (GraphQL)

### List Databases
```graphql
query {
  allDatabases {
    name
  }
}
```

### Inspect Tables and Row Count
```graphql
query {
  oneDatabase(name: "Test") {
    name
    tables {
      name
      totalRows
    }
  }
}
```

### Query Data with Pagination and Column Filtering
```graphql
query {
  oneDatabase(name: "Test") {
    tables {
      name
      rows(field: "Name", limit: 5, offset: 0)
    }
  }
}
```

## 🧪 Testing
```bash
cd GraphQlTest
npm test
```

---
**Remastered with ❤️ to comply with SOLID and Clean Code.**
