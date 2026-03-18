---
title: "API Sistema de Gestión y Cobranza"
description: "Servicio REST para el manejo automatizado de deudas de usuarios y penalizaciones recurrentes."
tags: ["Python", "Django REST", "PostgreSQL", "Docker", "Celery"]
repoUrl: "https://github.com/ejemplo/api-gestion"
order: 1
publishDate: 2026-03-10
---

## Resumen

Una API REST robusta que automatiza el ciclo de vida de deudores, gestionando suspensiones y emisión de reportes. Fue diseñada para reemplazar un sistema heredado que requería cruces de base de datos diarios y manuales.

## El Problema

El ecosistema previo procesaba un volumen alto (50+ mil registros) vía CRON jobs lentos en PHP, lo que causaba timeouts, inconsistencias y sobrecarga en la base de datos principal cada fin de mes.

## La Solución Técnica

Implementé una arquitectura limpia separando las capas de dominio (lógica de estados de deuda) y de infraestructura (Django Models/Postgres). Todo fue orquestado con `Celery` y RabbitMQ para procesamiento en segundo plano con *workers* escalables.

```python
# snippet: Ejemplo de lógica limpia para suspender usuarios
class SuspensionService:
    def __init__(self, user_repo: UserRepository, msg_broker: EventBroker):
        self._users = user_repo
        self._broker = msg_broker

    def evaluate_suspension(self, user_id: UUID) -> None:
        user = self._users.get_by_id(user_id)
        
        if user.is_in_debt() and user.debt_age_days > 30:
            user.suspend()
            self._users.save(user)
            self._broker.publish(UserSuspendedEvent(user.id))
```

## Reto superado

El mayor desafío fue asegurar que el estado de suspensión se reflejara instantáneamente en los sistemas conectados (aplicación móvil y facturación). Utilizando patrón de *Outbox* logramos 99.9% de consistencia eventual a pesar de fallos de red en el broker.
