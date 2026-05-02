# Arquitectura FlyTrack

## Resumen

FlyTrack es una aplicación web full-stack diseñada bajo una arquitectura de tres capas, con separación clara entre la interfaz de usuario, la lógica de negocio y la persistencia de datos.

Esta arquitectura permite que el sistema sea más organizado, mantenible y fácil de desplegar dentro de un flujo DevOps. La solución está compuesta por un frontend desarrollado en React con TypeScript, un backend construido con Node.js y Express, y una base de datos SQLite para almacenar la información de vuelos, notificaciones y reportes de equipaje.

Además, el proyecto está preparado para ejecutarse mediante contenedores Docker, lo que facilita su despliegue en un entorno controlado y reproducible.

---

## Componentes del Sistema

### Frontend — React + TypeScript

- **Tecnologías principales:** React 18, TypeScript, Vite y Tailwind CSS.
- **Patrón utilizado:** arquitectura basada en componentes.
- **Responsabilidad principal:** gestionar la interfaz de usuario y la experiencia del pasajero.

El frontend representa la capa de presentación de FlyTrack. Desde esta capa, el usuario puede consultar itinerarios de vuelo, revisar notificaciones, conocer la puerta de embarque y registrar reportes relacionados con inconvenientes de equipaje.

React permite construir la interfaz mediante componentes reutilizables. TypeScript ayuda a mejorar la seguridad del código mediante tipado estático. Vite permite un entorno de desarrollo rápido y eficiente, mientras que Tailwind CSS facilita la construcción de estilos visuales de forma ordenada.

#### Responsabilidades del frontend

- Mostrar la información de vuelos al usuario.
- Presentar notificaciones sobre cambios de vuelo.
- Permitir el registro de reportes de equipaje.
- Consumir los servicios expuestos por el backend.
- Mostrar estadísticas e información del sistema en pantalla.
- Mejorar la experiencia del usuario mediante componentes visuales reutilizables.

---

### Backend — Node.js + Express

- **Tecnologías principales:** Node.js, Express.js y ES Modules.
- **Tipo de arquitectura:** arquitectura por capas.
- **Responsabilidad principal:** exponer la API REST, procesar solicitudes y aplicar la lógica de negocio.

El backend representa la capa encargada de recibir las solicitudes del frontend, procesarlas, validar los datos y comunicarse con la base de datos. Está organizado mediante una arquitectura por capas, lo cual permite separar responsabilidades y facilitar el mantenimiento del sistema.

#### Capas del backend

##### Routes

Las rutas definen los endpoints HTTP disponibles en la API REST. Su función es recibir las solicitudes y dirigirlas al controlador correspondiente.

Ejemplos de rutas del sistema:

- `/api/flights`
- `/api/notifications`
- `/api/baggage`
- `/api/dashboard`
- `/api/health`

##### Controllers

Los controladores reciben las solicitudes del cliente, extraen los datos necesarios, llaman a los servicios correspondientes y devuelven una respuesta HTTP.

Su responsabilidad principal es coordinar la entrada y salida de información, sin concentrar toda la lógica de negocio.

##### Services

Los servicios contienen la lógica de negocio de la aplicación. En esta capa se realizan validaciones, procesamiento de información y coordinación entre diferentes repositorios.

Por ejemplo, un servicio puede validar los datos de un reporte de equipaje antes de enviarlos a la base de datos.

##### Repositories

Los repositorios se encargan del acceso a datos. Ejecutan consultas SQL sobre la base de datos SQLite mediante la librería `better-sqlite3`.

Esta capa permite que el resto del backend no dependa directamente de los detalles internos de la base de datos.

#### Responsabilidades del backend

- Exponer servicios mediante una API REST.
- Procesar solicitudes enviadas desde el frontend.
- Validar datos de entrada.
- Aplicar reglas de negocio.
- Consultar y modificar la base de datos.
- Devolver respuestas estructuradas en formato JSON.

---

### Base de Datos — SQLite

- **Tecnología principal:** SQLite.
- **Librería utilizada:** `better-sqlite3`.
- **Responsabilidad principal:** almacenar y consultar la información del sistema.

La base de datos representa la capa de persistencia de FlyTrack. Se utiliza SQLite porque es una base de datos ligera, portable y adecuada para una implementación mínima viable en una práctica DevOps.

A diferencia de motores como MySQL o PostgreSQL, SQLite no requiere un servidor independiente. La información se almacena en un archivo de base de datos, lo que facilita la ejecución local y la integración con Docker.

#### Información almacenada

La base de datos almacena principalmente:

- Vuelos.
- Notificaciones.
- Reportes de equipaje.
- Datos utilizados por el dashboard.

#### Responsabilidades de la base de datos

- Persistir la información del sistema.
- Permitir consultas desde el backend.
- Almacenar reportes registrados por los usuarios.
- Mantener información de vuelos y notificaciones.
- Servir como fuente de datos para las estadísticas del sistema.

---

## Flujo de Datos

El flujo de datos en FlyTrack inicia cuando el usuario interactúa con la aplicación desde el navegador. Por ejemplo, cuando consulta un vuelo, revisa una notificación o registra un reporte de equipaje.

Primero, el frontend captura la acción del usuario y envía una solicitud HTTP al backend. Luego, el backend recibe la solicitud mediante una ruta de Express, la redirige al controlador correspondiente y este llama al servicio encargado de procesar la lógica de negocio.

Si la operación requiere consultar o modificar información, el servicio se comunica con el repositorio correspondiente. El repositorio ejecuta la consulta SQL sobre la base de datos SQLite. Finalmente, la información regresa al frontend en formato JSON y se muestra al usuario.

### Representación general del flujo

```text
Usuario
   ↓
Frontend React + TypeScript
   ↓
Solicitud HTTP / API REST
   ↓
Routes Express
   ↓
Controllers
   ↓
Services
   ↓
Repositories
   ↓
Base de datos SQLite
   ↓
Respuesta JSON
   ↓
Frontend React + TypeScript
   ↓
Usuario
