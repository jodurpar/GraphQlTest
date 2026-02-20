# Resultados de pruebas - GraphQL Test

Fecha: 2026-02-20  
Servidor: http://localhost:15250/graphql  
Estado: Activo (puerto 15250 en escucha)

## Resumen de ejecución de ejemplos del archivo `TestMe.md`

| #   | Consulta                                 | Resultado             | Error detallado                                                        |
| --- | ---------------------------------------- | --------------------- | ---------------------------------------------------------------------- |
| 1   | `allDatabases`                           | ✅ Éxito               | `{"data":{"allDatabases":[{"name":"Test"},{"name":"PruebaGraphQl"}]}}` |
| 2   | `oneDatabase(name: "Test")` con `tables` | ❌ Error interno       | `{"error":"Internal Server Error"}` (HTTP 500)                         |
| 3   | `rows(limit: 100)`                       | ❌ Error de validación | `Cannot query field "rows" on type "Table".`                           |
| 4   | `rows(limit: 1, offset: 0)`              | ❌ Error de validación | Mismo error que arriba                                                 |
| 5   | `rows(limit: 10, offset: 10)`            | ❌ Error de validación | Mismo error que arriba                                                 |
| 6   | Prueba de inyección SQL                  | ✅ Éxito (null)        | `{"data":{"oneDatabase":null}}`                                        |

## Análisis detallado

### Consulta 1 – `allDatabases`
- **Resultado**: Correcto. El servidor devuelve dos bases de datos: `Test` y `PruebaGraphQl`.
- **Conclusión**: El campo `allDatabases` está operativo.

### Consulta 2 – `oneDatabase(name: "Test")`
- **Sintaxis probada**:
  ```graphql
  query {
    oneDatabase(name: "Test") {
      name
      tables {
        name
      }
    }
  }
  ```
- **Respuesta**: Error interno del servidor (500).  
- **Investigación adicional**:
  - La misma consulta solicitando solo el campo `name` sí funciona:
    `{"data":{"oneDatabase":{"name":"Test"}}}`
  - Por lo tanto, el fallo ocurre en el resolver del subcampo `tables`.
  - Posible causa: excepción no controlada al intentar listar las tablas de la base de datos `Test`.

- **Análisis del código** (archivo `builder.ts`):
  El resolver `tables` invoca a `TableRepository.getTablesByDatabase(dbName)`.
  El repositorio ejecuta la consulta:
  ```sql
  SELECT name FROM [${dbName}].sys.tables
  ```
  - La base de datos `Test` existe (confirmado por `allDatabases`).
  - El error interno sugiere que la consulta SQL falla (permisos, sintaxis, o la base de datos no contiene esquema `sys.tables`).
  - El campo `rows` está definido en el tipo `Table` en el código, pero el esquema publicado no lo incluye (error de validación en consultas 3‑5). Esto indica que el esquema GraphQL podría estar desactualizado (posiblemente el servidor no se haya reiniciado tras cambios en el código).
  
- **Recomendación inmediata**:
  Revisar los logs del servidor para ver la excepción concreta que se produce en `getTablesByDatabase`.

- **Prueba directa de SQL**:
  Para descartar un problema de base de datos, se ejecutó la consulta SQL subyacente directamente con `sqlcmd`:

  ```sql
  SELECT name FROM [Test].sys.tables
  ```

  **Resultado**: la consulta devuelve dos tablas (`Clientes` y `Table_1`), lo que demuestra que:
  1. La base de datos `Test` existe y es accesible con las credenciales configuradas.
  2. El esquema `sys.tables` está disponible y el usuario `sa` tiene permisos de lectura.
  
  Por lo tanto, el error interno **no se debe a un fallo de la consulta SQL**, sino a un problema en la capa de aplicación (posiblemente en la inyección de dependencias, el mapeo de resultados o una excepción no controlada en el resolver).

### Consultas 3‑5 – Uso del campo `rows`
- **Error común**: `Cannot query field "rows" on type "Table".`  
- **Interpretación**: El esquema GraphQL publicado **no incluye** el campo `rows` dentro del tipo `Table`.  
- **Consecuencia**: Las consultas que intentan paginar o limitar filas son inválidas y son rechazadas en la fase de validación.

### Consulta 6 – Prueba de seguridad (inyección)
- **Resultado**: La consulta con un nombre de base de datos que contiene caracteres de inyección (`Test]; DROP TABLE clientes;--`) devuelve `null` en lugar de provocar un error interno.  
- **Interpretación**: El servidor maneja la entrada de forma segura (probablemente la trata como un nombre de base de datos inexistente) y no ejecuta código SQL malicioso.  
- **Conclusión**: Comportamiento esperado en cuanto a seguridad.

## Recomendaciones

1. **Revisar el resolver `tables`** en `oneDatabase` para identificar la causa del error interno (posiblemente falta de conexión a la base de datos, permisos, o excepción no capturada).
2. **Actualizar el esquema GraphQL** para incluir el campo `rows` si se desea soportar la paginación de registros descrita en `TestMe.md`.  
3. **Verificar la coherencia** entre la documentación (`TestMe.md`) y la implementación real del esquema.
4. **Considerar mejorar los mensajes de error** internos para que devuelvan detalles útiles (en modo desarrollo) sin exponer información sensible.

## Archivos generados durante la prueba

- `query1.json` … `query6.json`: consultas GraphQL enviadas.
- `introspect.json`: consulta de introspección del esquema.
- `TestResults.md`: este informe.

---

*Pruebas ejecutadas automáticamente mediante curl y análisis de respuestas.*