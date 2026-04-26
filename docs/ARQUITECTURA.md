# Arquitectura FlyTrack

## Resumen

FlyTrack es una aplicación web full-stack diseñada con arquitectura de tres capas clara y separación de responsabilidades.

## Componentes del Sistema

### Frontend (React + TypeScript)
- **Tecnología**: React 18, TypeScript, Vite, Tailwind CSS
- **Patrón**: Component-based architecture
- **Responsabilidad**: Interfaz de usuario y experiencia del usuario

### Backend (Node.js + Express)
- **Tecnología**: Node.js, Express.js, ES Modules
- **Arquitectura**: Layered Architecture
    - **Routes**: Definición de endpoints HTTP
    - **Controllers**: Manejo de requests/responses
    - **Services**: Lógica de negocio
    - **Repositories**: Acceso a datos
- **Responsabilidad**: API REST y lógica de negocio

### Base de Datos (SQLite)
- **Tecnología**: SQLite con better-sqlite3
- **Responsabilidad**: Persistencia de datos

## Flujo de Datos