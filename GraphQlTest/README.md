# GraphQlText - Remasterizado 🚀

API GraphQL moderna construida con **Fastify**, **GraphQL Yoga** y **Pothos**, siguiendo los más altos estándares de ingeniería de software: **SOLID, KISS, DRY y Clean Code**.

## ✨ Características de la Remasterización
- **Arquitectura SOLID**: Desacoplamiento total mediante Inyección de Dependencias (`tsyringe`).
- **Arquitectura Code-First**: El esquema GraphQL se genera automáticamente desde el código TypeScript con **Pothos**, asegurando que el tipado sea la única fuente de verdad.
- **Seguridad**: Protección contra **SQL Injection** mediante repositorios tipados y saneamiento de entradas.
- **Validación Robusta**: Uso de **Zod** para validar todos los argumentos de entrada en los resolvers.
- **Testeo Confiable**: Suite de pruebas completa con **Jest** (Unitarias e Integración).
- **Inyección de Dependencias (DI)**: Inversión de dependencias para facilitar el mantenimiento y el testeo unitario mediante Mocks.

## 📁 Estructura del Proyecto
- `src/core`: Infraestructura core, tipos e Inyección de Dependencias.
- `src/db`: Definición de esquemas de bases de datos (Drizzle).
- `src/graphql`: Definición del esquema GraphQL y resolvers (Pothos).
- `src/repositories`: Capa de persistencia aislada (SRP).
- `src/services`: Servicios de negocio y utilidades.
- `src/__tests__`: Suite de pruebas unitarias e integración.

## 🚀 Cómo empezar

### Requisitos
- Node.js v18+
- SQL Server

### Instalación
```bash
npm install
```

### Configuración
Copia el archivo `.env.example` a `.env` y configura tus credenciales de base de datos.

### Desarrollo
```bash
npm run dev
```

### Pruebas
```bash
npm test
```

### Calidad de Código
```bash
npm run lint    # Verificar estilo
npm run format  # Corregir formato
```

---
**Remasterizado con ❤️ para cumplir con SOLID y Código Limpio.**
