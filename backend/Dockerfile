# Etapa 1: Build y dependencias
FROM node:20-alpine AS builder

# VITAL: Instalar herramientas de compilación para C++ (necesario para better-sqlite3)
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copiamos package.json y package-lock.json si existe
COPY package*.json ./

# Cambiamos 'npm ci' por 'npm install' para que genere el lockfile si no existe
RUN npm install

# Copiar el resto del código
COPY . .

# Etapa 2: Producción
FROM node:20-alpine

WORKDIR /app

# También necesitamos las herramientas aquí para las dependencias de producción
RUN apk add --no-cache wget python3 make g++

# Copiar solo archivos necesarios para instalar dependencias de producción
COPY package*.json ./
RUN npm install --only=production

# Copiar el código fuente desde el builder
# Aseguramos copiar 'src' completo (incluye utils para el seed)
COPY --from=builder /app/src ./src

# Crear directorio para la base de datos con permisos adecuados
RUN mkdir -p /app/data

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE_PATH=/app/data/flytrack.db

EXPOSE 3000

# Usamos la sintaxis de array para el CMD (recomendado)
# Esto ejecuta el seed antes de iniciar el servidor
CMD ["sh", "-c", "npm run seed && npm start"]