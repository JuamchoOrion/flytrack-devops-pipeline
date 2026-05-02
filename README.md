# FlyTrack - Sistema de Gestión Aeroportuaria

[![CI/CD Pipeline](https://github.com/JuamchoOrion/flytrack-devops-pipeline/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/JuamchoOrion/flytrack-devops-pipeline/actions/workflows/ci-cd.yml)

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
git clone https://github.com/JuamchoOrion/flytrack-devops-pipeline.git
cd flytrack-devops-pipeline
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
## 🌐 Despliegue online

Aplicación publicada:
https://[DOMINIO]

Health check del backend:
https://[DOMINIO]/api/health

## 📁 Estructura del Proyecto

```
flytrack-devops-pipeline/
├── docker-compose.yml          # Orquestación de contenedores
├── README.md                   # Este archivo
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # Flujo CI/CD de GitHub Actions
│
├── backend/                    # API REST Node.js + Express
│   ├── Dockerfile             # Imagen Docker del backend
│   ├── jest.config.js         # Configuración de Jest
│   ├── package.json           # Dependencias y scripts
│   ├── package-lock.json
│   ├── src/
│   │   ├── app.js             # Aplicación Express principal
│   │   ├── config/
│   │   │   └── database.js    # Inicialización SQLite
│   │   ├── controllers/       # Controladores de rutas
│   │   │   ├── baggageController.js
│   │   │   ├── dashboardController.js
│   │   │   ├── flightController.js
│   │   │   └── notificationController.js
│   │   ├── middlewares/       # Middleware Express
│   │   │   ├── errorHandler.js
│   │   │   └── validator.js
│   │   ├── repositories/      # Acceso a datos
│   │   │   ├── baggageRepository.js
│   │   │   ├── flightRepository.js
│   │   │   └── notificationRepository.js
│   │   ├── routes/            # Definición de rutas API
│   │   │   ├── baggageRoutes.js
│   │   │   ├── dashboardRoutes.js
│   │   │   ├── flightRoutes.js
│   │   │   └── notificationRoutes.js
│   │   ├── services/          # Lógica de negocio
│   │   │   ├── baggageService.js
│   │   │   ├── dashboardService.js
│   │   │   ├── flightService.js
│   │   │   └── notificationService.js
│   │   └── utils/
│   │       └── seed.js        # Script para poblar BD
│   └── tests/                 # Tests unitarios e integración
│       ├── health.test.js
│       ├── flights.test.js
│       ├── notifications.test.js
│       ├── baggage.test.js
│       └── dashboard.test.js
│
├── frontend/                   # Aplicación React + TypeScript
│   ├── Dockerfile             # Imagen Docker + Nginx
│   ├── vite.config.ts         # Configuración Vite + Vitest
│   ├── tsconfig.json          # Configuración TypeScript
│   ├── package.json           # Dependencias y scripts
│   ├── package-lock.json
│   ├── tailwind.config.js     # Configuración Tailwind CSS
│   ├── postcss.config.js
│   ├── index.html             # Punto de entrada HTML
│   ├── public/                # Assets estáticos
│   ├── src/
│   │   ├── App.tsx            # Componente raíz
│   │   ├── main.tsx           # Punto de entrada React
│   │   ├── index.css          # Estilos globales
│   │   ├── vite-env.d.ts
│   │   ├── components/        # Componentes reutilizables
│   │   │   ├── FlightCard.tsx
│   │   │   ├── NotificationCard.tsx
│   │   │   ├── StatCard.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── pages/             # Páginas principales
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Flights.tsx
│   │   │   ├── Notifications.tsx
│   │   │   └── BaggageReport.tsx
│   │   ├── services/
│   │   │   └── api.ts         # Cliente Axios para API
│   │   ├── types/
│   │   │   └── index.ts       # Tipos TypeScript
│   │   └── test/              # Tests de componentes
│   │       ├── setup.ts
│   │       ├── FlightCard.test.tsx
│   │       ├── NotificationCard.test.tsx
│   │       └── BaggageReport.test.tsx
│   └── dist/                  # Build de producción (generado)
│
└── docs/
    └── ARQUITECTURA.md        # Documentación de arquitectura
```

### Descripción de directorios clave

| Directorio | Propósito |
|-----------|-----------|
| `backend/src/controllers` | Lógica de solicitud/respuesta HTTP |
| `backend/src/services` | Reglas de negocio y validaciones |
| `backend/src/repositories` | Acceso y manipulación de datos SQLite |
| `backend/tests` | Tests de integración con Supertest |
| `frontend/src/pages` | Vistas principales enrutables |
| `frontend/src/components` | Componentes React reutilizables |
| `frontend/src/test` | Tests de componentes con Vitest |
| `.github/workflows` | Pipelines CI/CD automatizados |
