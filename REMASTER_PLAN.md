# Proyecto GraphQlText: Plan de Remasterización

Este documento detalla el plan estratégico para la actualización, refactorización y modernización del proyecto **GraphQlText**, aplicando principios de ingeniería de software como **SOLID, KISS, DRY y Código Limpio**, además de la implementación de una suite de pruebas completa.

---

## 🛠️ Objetivos Principales
1.  **Eliminar el acoplamiento rígido**: Migrar de una arquitectura basada en clases estáticas a una basada en Inyección de Dependencias (DI).
2.  **Seguridad y Tipado**: Implementar un ORM (Drizzle) para evitar SQL Injection y asegurar tipado estricto en la base de datos.
3.  **Arquitectura Code-First**: Evaluar la migración a Pothos GraphQL para generar el esquema desde el código, asegurando que TypeScript sea la única fuente de verdad.
4.  **Modernizar el stack**: Actualizar dependencias y añadir gestión de entorno (`dotenv`) y validación (`Zod`).
5.  **Robustez**: Implementar pruebas unitarias e integración con Jest.

---

## 📅 Fases del Plan de Trabajo

### Fase 1: Preparación e Infraestructura
**Meta:** Establecer las bases técnicas y herramientas de calidad.
*   [ ] **Actualización de Dependencias**: 
    *   Subir `typescript` a v5.x.
    *   Actualizar `fastify`, `mercurius` (o migrar a `graphql-yoga`) y `mssql`.
*   [ ] **Seguridad y Configuración**: 
    *   Configurar `dotenv` y `zod` para validación de variables de entorno y esquemas.
*   [ ] **Linter y Formateo**: Configurar `eslint` y `prettier`.
*   [ ] **Configuración de Tests**: Instalar `jest`, `ts-jest` y `supertest`.
*   [ ] **TypeScript Estricto**: Activar `strict: true` en `tsconfig.json` para eliminar el uso de `any`.
*   [x] **Linter y Formateo**: Configurar `eslint` y `prettier`.
*   [x] **Configuración de Tests**: Instalar `jest`, `ts-jest` y `supertest`.
*   [x] **TypeScript Estricto**: Activar `strict: true` en `tsconfig.json` para eliminar el uso de `any`.

### Fase 2: Refactorización Arquitectónica (SOLID & DI)
**Meta:** Desacoplar el sistema para hacerlo mantenible y testeable.
*   [x] **Adiós a lo Estático**: Convertir `SqlService`, `ConfigService` y resolvers en clases instanciables.
*   [x] **Inyección de Dependencias**: Implementar un patrón de DI (manual o mediante librería como `tsyringe`) para cumplir con el Principio de Inversión de Dependencias.
*   [x] **Corrección de Nomenclatura**: Renombrar la carpeta `src/bussiness` a `src/business`.
*   [x] **Estandarización de Módulos**: Migrar todos los `require()` a `import` (ESM).

### Fase 3: Capa de Datos y Persistencia (SOLID-SRP & Seguridad)
**Meta:** Separar claramente las capas y asegurar la base de datos.
*   [x] **Implementación de Drizzle ORM**: Configurar Drizzle para manejar las queries de forma Type-safe y protegida contra inyecciones.
*   [x] **Capa de Repositorio**: Mover las queries de `SqlService` a repositorios específicos inyectables.
*   [x] **Validación con Zod**: Asegurar que los datos de entrada en los resolvers cumplan con el contrato esperado.

### Fase 4: Optimización del Esquema GraphQL (DRY)
**Meta:** Reducir la duplicación y el trabajo manual.
*   [ ] **Simplificación de Esquemas**: Implementar mejores prácticas en la definición de TypeDefs.
*   [x] **Campo totalRows para paginación**: Agregar campo `totalRows` al tipo `Table` para conocer el total de filas y permitir paginación correcta.

### Fase 5: Implementación de Suite de Pruebas
**Meta:** Alcanzar una cobertura confiable.
*   [x] **Tests Unitarios**: Probar lógica de negocio y servicios usando Mocks. (Ej: `database-repository.test.ts`, `table-repository.test.ts`)
*   [x] **Tests de Integración**: Pruebas de API sobre los endpoints GraphQL. (Ej: `graphql.integration.test.ts`)

### Fase 6: Pulido Final y Errores
**Meta:** Experiencia de usuario y desarrollador premium.
*   [ ] **Gestión de Errores Global**: Implementar un manejador de errores centralizado en Fastify.
*   [ ] **Logger Profesional**: Configurar un sistema de logs estructurado.

---

## 🚀 Próximos Pasos
1. Finalizar la Fase 6 (Gestión de Errores Global y Logger).
2. Refinar la documentación del API.
