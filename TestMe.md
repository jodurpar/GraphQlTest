# TestMe – Manual Testing Guide

This document guides manual testing to validate that the remastered API works correctly both locally and in Docker.

## 📋 Prerequisites
- Local server active: `npm run dev` listening at `http://localhost:15250/graphql`
- Or active Docker container: `docker-compose up` listening at `http://localhost:15250/graphql`

## ✅ Test Steps

1. **Initial Access**
   - Open `http://localhost:15250/graphql` in your browser.
   - It should load the **GraphiQL** interface (GraphQL Yoga).

2. **Database Listing**
   ```graphql
   query {
     allDatabases {
       name
     }
   }
   ```
   *Validation*: Verify that at least the `Test` database appears.

3. **Table Inspection and Count**
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
   *Validation*: The `totalRows` field should show the actual number of rows for each table.

4. **Query Data with Pagination**
   ```graphql
   query {
     oneDatabase(name: "Test") {
       tables {
         name
         rows(limit: 5, offset: 0)
       }
     }
   }
   ```
   *Validation*: Returns a maximum of 5 rows in dynamic JSON format.

5. **🔍 Column Filtering (New Feature)**
   ```graphql
   query {
     oneDatabase(name: "Test") {
       tables {
         name
         rows(field: "Name", limit: 3)
       }
     }
   }
   ```
   *Validation*: Results should contain **only** the "Name" property.

6. **SQL Injection Defense**
   ```graphql
   query {
     oneDatabase(name: "Test]; DROP TABLE non_existent;--") {
       name
     }
   }
   ```
   *Validation*: The query should fail with a controlled database error, demonstrating that bracket escaping `[Test]]` works and prevents multi-command execution.

## 📦 Technical Notes
- **Flexibility**: The `rows` field is a dynamic JSON scalar to handle tables with unknown schemas.
- **Efficiency**: The network automatically detects the environment (Docker vs Local) for host binding.
- **Architecture**: Resolvers invoke the service layer, which uses typed Repositories for data access.

---
*Maintained by the Remasterization team (SOLID/DI).*
