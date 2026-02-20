# TestMe – Manual Testing Guide

Este documento guía las pruebas manuales para validar que la API remasterizada funciona correctamente tanto en local como en Docker.

## 📋 Prerequisitos
- Servidor local activo: `npm run dev` que escucha en `http://localhost:15250/graphql`
- O contenedor Docker activo: `docker-compose up` que escucha en `http://localhost:15250/graphql`

## ✅ Pasos de prueba

1. **Acceso inicial**
   - Abrir `http://localhost:15250/graphql` en el navegador.
   - Debería cargar la interfaz de **GraphiQL** (GraphQL Yoga).

2. **Listado de Bases de Datos**
   ```graphql
   query {
     allDatabases {
       name
     }
   }
   ```
   *Validación*: Verifica que aparezca al menos la base de datos `Test`.

3. **Inspección de Tablas y Conteo**
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
   *Validación*: El campo `totalRows` debe mostrar el número real de filas de cada tabla.

4. **Consulta de Datos con Paginación**
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
   *Validación*: Devuelve un máximo de 5 filas en formato JSON dinámico.

5. **🔍 Filtrado de Columna (Nueva Funcionalidad)**
   ```graphql
   query {
     oneDatabase(name: "Test") {
       tables {
         name
         rows(field: "Nombre", limit: 3)
       }
     }
   }
   ```
   *Validación*: Los resultados deben contener **únicamente** la propiedad "Nombre".

6. **Defensa SQL Injection**
   ```graphql
   query {
     oneDatabase(name: "Test]; DROP TABLE no_existo;--") {
       name
     }
   }
   ```
   *Validación*: La query debe fallar con un error controlado de base de datos, demostrando que el escape de corchetes `[Test]]` funciona y evita la ejecución de comandos múltiples.

## 📦 Notas Técnicas
- **Flexibilidad**: El campo `rows` es un escalar JSON para manejar tablas con esquemas desconocidos.
- **Eficiencia**: La red detecta automáticamente el entorno (Docker vs Local) para el binding del host.
- **Arquitectura**: Los resolvers invocan a la capa de servicios, que a su vez usa Repositorios tipados para el acceso a datos.

---
*Mantenido por el equipo de Remasterización (SOLID/DI).*
