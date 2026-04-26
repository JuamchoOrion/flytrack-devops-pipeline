# FlyTrack - Sistema de Gestión Aeroportuaria

[![CI/CD Pipeline](https://github.com/tu-usuario/flytrack/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/tu-usuario/flytrack/actions/workflows/ci-cd.yml)

Sistema web moderno para la gestión de operaciones aeroportuarias, desarrollado como caso de estudio DevOps para AeroPuerto Smart.

## 🚀 Características

- **Dashboard en tiempo real** - Métricas y estadísticas de operaciones
- **Gestión de vuelos** - Consulta, búsqueda y seguimiento de itinerarios
- **Sistema de notificaciones** - Alertas automáticas de cambios de vuelo
- **Reporte de equipaje** - Gestión de incidencias con equipaje

## 🛠️ Stack Tecnológico

### Frontend
- React 18 + TypeScript
- Vite (Build tool)
- React Router v6
- Tailwind CSS
- Axios

### Backend
- Node.js 20+ con ES Modules
- Express.js
- SQLite (better-sqlite3)
- Arquitectura en capas

### DevOps
- Docker + Docker Compose
- GitHub Actions CI/CD
- Testing automatizado (Jest + Vitest)

## 📋 Prerequisitos

- Node.js 20.x o superior
- Docker y Docker Compose (opcional, para containerización)
- Git

## 🏃 Inicio Rápido

### Opción 1: Ejecución Local (Desarrollo)

#### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/flytrack.git
cd flytrack
```

#### 2. Configurar variables de entorno
```bash
# Copiar archivos de ejemplo
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

#### 3. Backend
```bash
cd backend
npm install
npm run seed    # Poblar base de datos con datos de prueba
npm run dev     # Inicia en http://localhost:3000
```

#### 4. Frontend (en otra terminal)
```bash
cd frontend
npm install
npm run dev     # Inicia en http://localhost:5173
```

### Opción 2: Ejecución con Docker Compose (Producción Local)

```bash
# Desde la raíz del proyecto
docker-compose up --build

# Acceder a:
# Frontend: http://localhost:80
# Backend API: http://localhost:3000
```

## 🧪 Ejecutar Tests

### Backend
```bash
cd backend
npm test              # Ejecutar todos los tests
npm run test:watch    # Modo watch
npm run test:coverage # Con cobertura
```

### Frontend
```bash
cd frontend
npm test
```

## 📁 Estructura del Proyecto