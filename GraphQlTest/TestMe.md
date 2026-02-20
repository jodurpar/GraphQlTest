# TestMe – Manual Testing Guide

## 📋 Prerequisitos
- Tener la API en ejecución: `npm run dev`
- La API escucha en **http://localhost:15250/graphql** (GraphiQL está disponible en esa URL).

## ✅ Pasos de prueba
1. **Comprobar que el servidor está activo**
   - Abrir el navegador en `http://localhost:15250/graphql` y verificar que la interfaz GraphiQL carga sin errores.

2. **Listar todas las bases de datos**
   ```graphql
   query {
     allDatabases {
       name
     }
   }
   ```
   *Resultado esperado*: aparece la base de datos `Test` (y cualquier otra que exista).

3. **Listar las tablas de la base `Test`**
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
   *Resultado esperado*: al menos la tabla `clientes` con su número total de filas.

4. **Recuperar todos los registros de una tabla (hasta 100 filas)**
   ```graphql
   query {
     oneDatabase(name: "Test") {
       tables {
         name
         totalRows
         rows(limit: 100)   # máximo 100 en la implementación actual
       }
     }
   }
   ```
   *Resultado esperado*: un array de objetos JSON con todas las columnas de cada fila, y el conteo total en `totalRows`.

5. **Recuperar un único registro** (primer registro)
   ```graphql
   query {
     oneDatabase(name: "Test") {
       tables {
         name
         rows(limit: 1, offset: 0)   # primer registro
       }
     }
   }
   ```
   *Resultado esperado*: un array con un solo objeto JSON.

6. **Paginar resultados** (ejemplo: página 2, 10 filas por página)
   ```graphql
   query {
     oneDatabase(name: "Test") {
       tables {
         name
         rows(limit: 10, offset: 10)   # filas 11‑20
       }
     }
   }
   ```

7. **Prueba de seguridad – intento de inyección**
   ```graphql
   query {
     oneDatabase(name: "Test]; DROP TABLE clientes;--") {
       name
       tables {
         name
       }
     }
   }
   ```
   *Resultado esperado*: la consulta falla de forma controlada y **no** elimina la tabla.

## 📦 Notas adicionales
- El campo `rows` devuelve un **escala​r JSON**, por lo que cada fila contiene todas sus columnas. Puedes filtrar los campos que necesites en el cliente (p. ej., `row.Nombre`).
- Los argumentos `limit` y `offset` permiten paginar sin sobrecargar la respuesta.
- Si en el futuro se añade el argumento `field`, podrás solicitar solo una columna, por ejemplo `rows(limit: 5, field: "Email")`.

---
*Este documento está pensado para pruebas manuales rápidas y para validar que la capa de datos funciona correctamente y de forma segura tras la remasterización (SOLID, DI, Pothos, Yoga).*
