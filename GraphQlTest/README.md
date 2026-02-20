# GraphQlText - Remasterizado 🚀

API GraphQL moderna construida con **Fastify**, **GraphQL Yoga** y **Pothos**, siguiendo los más altos estándares de ingeniería de software: **SOLID, KISS, DRY y Clean Code**.

## ✨ Características de la Remasterización
- **Arquitectura SOLID**: Desacoplamiento total mediante Inyección de Dependencias (`tsyringe`).
- **Arquitectura Code-First**: El esquema GraphQL se genera automáticamente desde el código TypeScript con **Pothos**, asegurando que el tipado sea la única fuente de verdad.
- **Seguridad**: Protección contra **SQL Injection** mediante repositorios tipados y saneamiento de entradas (`[dbSafe]`).
- **Flexible & Dinámico**: Recupera datos de cualquier tabla con soporte para paginación (`limit`, `offset`) y filtrado opcional de columnas (`field`).
- **Docker Ready**: Imagen multi-etapa optimizada para Node.js 20 con `docker-compose`.

## 📁 Estructura del Proyecto
- `src/core`: Infraestructura core, tipos e Inyección de Dependencias.
- `src/db`: Definición de esquemas si se usara ORM (preparado para expansión).
- `src/graphql`: Definición del esquema GraphQL y resolvers (Pothos).
- `src/repositories`: Capa de persistencia aislada (Repository Pattern).
- `src/services`: Servicios de negocio (Configuración, SQL, etc).
- `src/__tests__`: Suite de pruebas unitarias e integración con Jest.

## 🚀 Cómo empezar

### Requisitos
- Node.js v20+ (o Docker)
- SQL Server

### Instalación Local
```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo (tsx watch)
npm run dev
```

### 🐳 Despliegue con Docker
La aplicación está preparada para ejecutarse en contenedores de forma aislada.

1. **Construir y levantar**:
   ```bash
   docker-compose up -d --build
   ```
2. **Acceso**: La API estará disponible en `http://localhost:15250/graphql`.

### ⚙️ Variables de Entorno
Configurables vía `.env` o directamente en el `docker-compose.yml`:
- `API_HOST`: Host de escucha (`0.0.0.0` para Docker, `localhost` para local).
- `DB_SERVER`: Servidor de base de datos (Ej: `host.docker.internal` para conectar al SQL Server de tu máquina desde Docker).
- `DB_USER` / `DB_PASSWORD`: Credenciales opcionales si no usas las de `apiData.ts`.

## 🧪 Pruebas
```bash
# Ejecutar todos los tests (Unitarios e Integración)
npm test
```

## 🛠️ Calidad de Código
```bash
npm run lint    # Verificar estilo (ESLint)
npm run format  # Corregir formato (Prettier)
```

---
**Remasterizado con ❤️ para cumplir con SOLID y Código Limpio.**
