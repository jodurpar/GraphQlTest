# Docker Container Guide: jodurpar/graphqltest 🚀

This container provides a **remastered GraphQL API** for SQL Server, built with Node.js 20, Fastify, and Pothos. It follows SOLID principles and is designed for high performance and security.

## 📝 What this container does
- **Dynamic SQL Querying**: Explore SQL Server databases, tables, and views through GraphQL.
- **Selective Projections**: Query only the columns you need using the `field` argument.
- **Pagination**: Built-in `limit` and `offset` support for large datasets.
- **SQLi Protection**: Automatic bracket escaping and typed repositories to prevent SQL Injection.
- **Lightweight**: Optimized multi-stage build (Alpine-based) for minimal footprint.

## 🚀 How to use it locally

### 1. Download the image
Pull the latest version from Docker Hub:
```bash
docker pull jodurpar/graphqltest:latest
```

### 2. Run the container
The API needs to connect to a SQL Server instance. If your SQL Server is running on your host machine, use `host.docker.internal` as the server address.

```bash
docker run -d \
  --name graphql-api \
  -p 15250:15250 \
  -e API_HOST=0.0.0.0 \
  -e DB_SERVER=host.docker.internal \
  -e DB_USER=your_user \
  -e DB_PASSWORD=your_password \
  --add-host=host.docker.internal:host-gateway \
  jodurpar/graphqltest:latest
```

The API will be available at: **http://localhost:15250/graphql**

## 🔍 Usage Examples

Once the container is running, you can use the built-in **GraphiQL** interface at the URL above to try these queries:

### Example 1: List all schemas and tables with row counts
Useful for a quick overview of your database structure.
```graphql
query {
  oneDatabase(name: "YourDatabaseName") {
    tables {
      name
      totalRows
    }
  }
}
```

### Example 2: Query specific data with limited columns
Get the first 5 entries from a table, but only retrieve the "Name" column.
```graphql
query {
  oneDatabase(name: "YourDatabaseName") {
    tables {
      name
      rows(field: "Name", limit: 5)
    }
  }
}
```

---
*Developed with SOLID & Clean Code principles.*
