# FlyTrack — Pipeline DevOps CI/CD

## AeroPuerto Smart | Práctica universitaria de DevOps

Sistema de seguimiento de vuelos con pipeline DevOps completo:
automatización de pruebas, contenedorización con Docker y despliegue
continuo mediante GitHub Actions.

---

## Equipo de trabajo

| # | Rol DevOps | Responsabilidad principal |
|---|---|---|
| Integrante 1 | Analista DevOps | Investigación, diagnóstico del caso y conceptualización |
| Integrante 2 | Desarrollador principal | Aplicación base FlyTrack y estructura del repositorio |
| Integrante 3 | QA / Calidad | Pruebas unitarias automatizadas y validación de calidad |
| Integrante 4 | DevOps / Operaciones | Docker, GitHub Actions, CI/CD y despliegue a staging |
| Integrante 5 | Documentación y comunicación | Informe técnico, evidencias y presentación final |

---

## Stack tecnológico

- **Lenguaje:** Python
- **Pruebas:** pytest
- **Calidad de código:** flake8 / pylint
- **Contenedor:** Docker + Docker Compose
- **CI/CD:** GitHub Actions
- **Control de versiones:** Git + GitHub

---

## Estructura del proyecto
-- pegar aca 

---

## Pipeline CI/CD

El pipeline automatiza las siguientes etapas en orden:

1. **Instalación de dependencias** — `pip install -r requirements.txt`
2. **Pruebas unitarias** — `pytest tests/`
3. **Análisis de calidad** — `flake8 src/`
4. **Build de imagen Docker** — `docker build`
5. **Despliegue a staging** — `docker compose up`

---

## Cómo ejecutar localmente

```bash
# Clonar el repositorio
git clone https://github.com/<org>/flytrack-devops-pipeline.git
cd flytrack-devops-pipeline

# Ejecutar con Docker Compose
docker compose up

# O ejecutar directamente
pip install -r requirements.txt
python src/main.py
```

---

## Cómo ejecutar las pruebas

```bash
pip install -r requirements.txt
pytest tests/ -v
```

---

## Coordinación del equipo

| Integrante | Se coordina principalmente con |
|---|---|
| 1 — Analista | 4 (pipeline) y 5 (informe) |
| 2 — Desarrollo | 3 (pruebas) y 4 (Docker/CI) |
| 3 — QA | 2 (código) y 4 (pipeline) |
| 4 — DevOps | 2, 3 y 5 (evidencias técnicas) |
| 5 — Documentación | Todos los integrantes |

---

## Contexto académico

Práctica de la asignatura de DevOps.
**Caso:** AeroPuerto Smart necesita modernizar el proceso de desarrollo
y despliegue de su sistema FlyTrack aplicando principios y herramientas DevOps.

**Problema central:** el equipo actual trabaja sin integración continua,
sin pruebas automatizadas y sin entornos controlados, lo que genera
errores en producción, despliegues manuales y falta de trazabilidad.

**Solución propuesta:** implementar un pipeline CI/CD completo con
automatización de pruebas, contenedorización Docker y despliegue
continuo a un entorno de staging controlado.
