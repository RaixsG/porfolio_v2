---
title: "Dashboard Analytics & Profitability API"
description: "Módulo de análisis de datos para visualización de ingresos, ventas por día, top de productos y cálculo de rentabilidad."
tags: ["Python", "Django REST", "PostgreSQL", "Data Analysis", "ORM"]
private: true
repoUrl: "https://github.com/ejemplo/api-gestion"
order: 1
publishDate: 2026-03-18
---

## Resumen

Una completa API para el Dashboard de administración que provee métricas en tiempo real. Permite visualizar el flujo de caja, las ventas diarias desglosadas por tipo de comprobante, los vendedores estrella y el cálculo exacto de la rentabilidad restando el costo de adquisión a las ventas netas.

## El Problema

El sistema carecía de una vista consolidada que mostrara la salud financiera del negocio. Los administradores tenían que cruzar datos de ventas y compras manualmente, o revisar múltiples reportes en Excel para determinar cuál era su rentabilidad real y qué productos marginaban mejor.

## La Solución Técnica

Implementé una serie de Endpoints (`ViewSets`) apoyándome fuertemente en el ORM de Django (usando `annotate`, `aggregate`, `TruncDay`, `Coalesce` y objetos `Q` / `F`) para delegar el procesamiento matemático complejo directamente a la base de datos PostgreSQL, asegurando alta velocidad de respuesta:

```python
# snippet: Cálculo de Rentabilidad en la Base de Datos
@extend_schema(tags=['Dashboard Rentabilidad'])
class ProfitabilityViewSet(viewsets.ReadOnlyModelViewSet):
    # ...
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        sales = queryset.annotate(
            total_venta=Sum(F('quantity') * F('unitPrice')),
            total_costo=Sum((F('quantity') * F('price__equivalent')) * F('product__product__purchacePrice')),
            rentabilidad=F('total_venta') - F('total_costo')
        ).aggregate(
            total=Sum('rentabilidad')
        )['total'] or 0

        sales = float(sales) if sales else 0

        return Response({
            'rentabilidad': sales
        })
```

## Reto superado

El principal desafío fue optimizar las consultas para evitar problemas puntuales como valores nulos (`null`) que rompían la serialización, y agrupar enormes volúmenes de datos por fecha (`TruncDay`) en cuestión de milisegundos sin ocasionar bloqueos de N+1 queries. Lo superé usando `Coalesce` e incorporando los cálculos en capa de base de datos en lugar de iterar objetos en Python.
