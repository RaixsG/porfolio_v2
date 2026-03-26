---
title: "Zenda Cobros App - Aplicación Integral de Gestión de Cobros"
description: "Plataforma mobile offline-first con arquitectura limpia, sincronización inteligente y reactividad de punta a punta para cobradores de campo."
tags: ["Flutter", "Dart", "Provider", "Drift", "SQLite", "Offline-First", "Reactive"]
private: true
repoUrl: "https://github.com/zenda/cobros-app"
order: 4
publishDate: 2026-03-25
---

## Visión General

Zenda Cobros es una aplicación mobile diseñada para cobradores de campo que opera en entornos con conectividad inestable. La arquitectura implementa un modelo **Local-First** con sincronización inteligente en background, garantizando que los datos nunca se pierdan y la experiencia sea fluida incluso sin conexión.

## Pilares Arquitectónicos

### 1. Arquitectura Limpia en Tres Capas
- **UI Layer**: Pantallas reactivas con `ChangeNotifier` y `Streams`
- **Business Logic Layer**: Providers que orquestan servicios y notifican cambios
- **Data Layer**: Servicios de API, SQLite vía Drift, y persistencia local

Esta separación de responsabilidades asegura que la lógica de negocio sea independiente de la interfaz y fácil de testear.

### 2. Local-First + Sincronización Reactiva
Todos los módulos utilizan **Drift/SQLite** como fuente de verdad local. La UI se suscribe a `Streams` reactivos que se actualizan automáticamente cuando los datos cambian en BD sin requerir recargas manuales.

```dart
// El patrón fundamental del proyecto
_service.watchData().listen((data) {
  _state = data;
  notifyListeners(); // La UI reacciona instantáneamente
});
```

El `SyncService` en background descarga datos del servidor y los persiste atómicamente, manteniendo la consistencia incluso si falla la red o cierra la app.

### 3. Persistencia Offline con UUID
Cada transacción (crédito, abono, configuración) recibe un UUID único en el momento de su creación local. Esto permite:
- Generar comprobantes correlativas sin servidor (`serie + number`)
- Sincronizar en orden FIFO (First-In-First-Out)
- Detectar y evitar duplicados tras fallas de red

## Módulos Clave

### Gestión de Créditos y Abonos
- Cada abono se registra localmente con UUID único y se marca como `pendingSync`
- Algoritmo de numeración que consulta máximo en BD local y datos sincronizados, evitando colisiones
- `SyncService` sube registros a API en orden cronológico
- Transacciones atómicas en Drift previenen estados inconsistentes

### Gestión de Deudores
- Patrón **Local-First**: lista reactiva que consulta filtros/búsquedas sin latencias de red
- Optimización de consultas JOIN complejas con índices estratégicos en SQLite
- Transformación de datos crudos a modelos de dominio fuera del hilo de UI
- Refresco constante sin bloqueos, navegación fluida

### Configuración del Sistema
- `AppConfig` wrapper sobre `SharedPreferences` para gestión centralizada
- Refresco instantáneo: cambios de dominio API se reflejan sin cerrar sesión
- Monitoreo reactivo de estado de sincronizaciones con timestamps relativos
- Soporte multi-entorno (desarrollo, pruebas, producción)

## Patrones Técnicos Unificadores

| Patrón | Beneficio | Dónde se Usa |
|--------|-----------|-------------|
| **Reactive Streams** | UI se actualiza automáticamente sin polling | Deudores, Créditos, Catálogos |
| **Batch Transactions** | Consistencia y velocidad en operaciones masivas | Sincronización de catálogos |
| **UUID + Numeración Secuencial** | Evita colisiones, permite offline-first | Créditos, Comprobantes |
| **FIFO Sync** | Garantiza orden cronológico e integridad | Todos los módulos |
| **Change Notifier Pattern** | Control centralizado del estado | AuthProvider, SettingsProvider, DebtsProvider |

## Desafíos Técnicos Resueltos

1. **Sincronización tras reinicios**: `InitializationService` valida tokens y sincroniza datos sin re-logins
2. **Numeración correlativa sin servidor**: Algoritmo que consulta máximos locales y remotos
3. **Performance con miles de deudores**: Índices SQLite + transformación de datos fuera del thread UI
4. **Cambios de configuración en tiempo real**: Notificación entre servicios sin cerrar sesión
5. **Estados intermedios durante batch sync**: Validación de integridad antes de commit

## Stack Tecnológico

- **Frontend**: Flutter + Dart
- **State Management**: Provider + Change Notifier
- **Persistencia Local**: Drift + SQLite
- **API Integration**: `ApiService` con manejo reactivo de errores
- **Patrones**: Clean Architecture, Local-First, SOLID
