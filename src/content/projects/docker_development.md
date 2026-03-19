---
title: "Dockerizando mi entorno de desarrollo"
description: "Infraestructura containerizada con PostgreSQL 16 y mi Backend Python FastApi para garantizar consistencia en mi equipo desarrolloß."
tags: ["Docker", "PostgreSQL", "Python", "DevOps", "Linux"]
private: true
repoUrl: "https://github.com/ejemplo/docker-dev-env"
order: 3
publishDate: 2026-03-18
---

## Resumen

Un entorno de desarrollo completamente containerizado que orquesta tanto un backend FastAPI como una base de datos PostgreSQL 16. Este setup elimina conflictos de versionado, dependencias y permite que cualquier desarrollador levante toda la aplicación con un único comando: `docker-compose up -d`.

## El Problema

Trabajar entre múltiples máquinas (PC personal y trabajo) con la BD instalada directamente en el sistema operativo era un dolor constante. Cada vez que hacía un Pull del backend en una máquina diferente, necesitaba reconfigurar todo desde cero: instalar las dependencias correctas, configurar las variables de entorno, y asegurarme de que la versión de PostgreSQL coincidiera. Si cometía un error en el proceso, literalmente el setup quedaba roto y no tenía otra opción que empezar nuevamente.

Sumado a esto, como cambio de proyecto cada X meses (migrando entre clientes o tareas internas), las máquinas se iban acumulando con versiones conflictivas de Python (3.10 vs 3.12), librerías desactualizadas, y configuraciones dispersas. Coordinar que el backend (FastAPI) y la base de datos (PostgreSQL) se comunicaran correctamente era una tarea manual demasiado propensa a errores.

## La Solución Técnica

Implementé una orquestación básica que me ayude a evitar problemas manuales usando Docker Compose que levanta dos servicios enlazados:

**1. El backend FastAPI con build local:**

```yaml
services:
  backend:
    working_dir: /app
    init: true
    restart: unless-stopped
    image: backend-fastapi
    container_name: backend_zenda_collections
    build: .  # Construye desde el Dockerfile local
    ports:
      - "8000:8000"
    volumes:
      - ./:/app:Z  # Hot-reload en desarrollo
    env_file:
      - .env
    depends_on:
      db:
        condition: service_started  # Espera a que PostgrSQL esté listo
```

**2. PostgreSQL 16 con variables de entorno desde .env:**

```yaml
  db:
    image: postgres:16.6
    restart: unless-stopped
    container_name: postgres_zenda_collections
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: ${DB_USERNAME}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_DATABASE}
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

**3. El Dockerfile con buenas prácticas:**

```dockerfile
FROM python:3.12.10-slim

ENV PIP_DISABLE_PIP_VERSION_CHECK=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Crear usuario no-root por seguridad
RUN groupadd -g 1000 appuser && \
    useradd -u 1000 -g appuser -s /bin/bash -m appuser

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

COPY . .

# Configurar directorios de media con permisos correctos
RUN mkdir -p /app/media/branch && \
    chmod -R 777 /app/media && \
    chown -R appuser:appuser /app

COPY --chmod=755 entrypoint.sh /app/
EXPOSE 8000

CMD ["/app/entrypoint.sh"]
```

**4. El entrypoint.sh que ejecuta la aplicación:**

```bash
#!/bin/bash

chmod -R 777 /app/media

# Descomenta esto cuando necesites migraciones automáticas:
# alembic revision --autogenerate -m "migrate"
# alembic upgrade head

echo "Starting application..."
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Con esto, un simple `docker-compose up -d` levanta todo el stack: FastAPI en el puerto 8000 con hot-reload, PostgreSQL en el 5432, y la comunicación entre servicios está automáticamente resuelta gracias a la red de Docker Compose. Las credenciales de la DB se cargan desde `.env.example`, manteniendo seguridad sin complicaciones en desarrollo.

## Reto superado

El desafío más complejo fue comprender como funciona Docker para intentar garantizar la comunicación confiable entre el backend y PostgreSQL: si el backend se levantaba antes de que la BD estuviera lista, FastAPI fallaba silenciosamente. Solucioné esto con `depends_on + service_started`, asegurando que el contenedor de BD esté en marcha antes de iniciar el backend.

Otro desafío fue mantener hot-reload en desarrollo sin que los archivos se corrompieran. El flag `:Z` en el volumen resuelve permisos de SELinux en sistemas Linux, mientras que el usuario no-root (`appuser`) evita permisos de archivo escalados innecesariamente.

Para credenciales, implementé un `.env` ignorado en git para valores reales. Para que una de las configuraciones solo sea las Varaibles de Entorno, y que docker se encargue del resto.

Finalmente, los directorios de media (`/app/media/branch`) necesitaban permisos específicos para que FastAPI pueda escribir archivos dinámicamente. El Dockerfile crea e inicializa esos directorios con permisos correctos, evitando errores de `permission denied` que aparecían al intentar guardar uploads en la BD.