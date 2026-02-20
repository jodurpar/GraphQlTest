# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar código fuente y construir
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

# Copiar solo lo necesario para producción
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
RUN npm install --omit=dev

# Exponer el puerto configurado
EXPOSE 15250

# Iniciar la aplicación
CMD ["npm", "start"]
