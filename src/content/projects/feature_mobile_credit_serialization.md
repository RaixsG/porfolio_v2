---
title: "Optimización y Serialización de API Móvil"
description: "Mejoras en las respuestas de la API para la aplicación móvil, incluyendo soporte anidado y prefetch de datos de créditos."
tags: ["Python", "Django REST", "Serializers", "Mobile API"]
private: true
repoUrl: "https://github.com/ejemplo/api-gestion"
order: 2
publishDate: 2026-03-18
---

## Resumen

Ajustes y adición de campos requeridos por el frontend móvil en los flujos de ventas y cobranzas. Permite al cliente móvil recibir información condensada y lista para imprimir o visualizar los pagos que se han realizado sobre sus ventas a crédito.

## El Problema

La aplicación móvil requería poder imprimir comprobantes de las ventas directo desde el celular de forma inmediata y tener la historia de los pagos activos referenciados correctamente. Inicialmente, estos datos venían fraccionados o faltaban banderas esenciales para renderizar la interfaz de usuario eficientemente.

## La Solución Técnica

Actualicé el sistema de serialización usando `ModelSerializer` para incluir propiedades bajo demanda, como el flag `print_sale` e integración con vistas para asegurar que sólo retorne información activa o relevante para minimizar el uso de ancho de banda:

```python
# snippet: Inclusión de Impresión y Detalles anidados
class SaleCreditMobileSerializer(serializers.ModelSerializer):
    debs = CreditMoibleSerializer(source="fk_creditSale", many=True, required=False)
    debsPaid = CreditsPaidsMobileSerializer(
        source="fk_creditPaidSale", many=True, required=False
    )
    products = ProductsMobileSerializer(source="fk_SDsale", many=True, required=False)
    totalDue = serializers.DecimalField(source="due", max_digits=20, decimal_places=10)
    print_sale = PrintsaleSerialier(source="*", many=False, required=False)

    class Meta:
        model = Sale
        fields = [
            "id", "invoiceType", "codSale", "issueDate", "totalDue",
            "totalPaid", "totalSale", "seller", "sellerName",
            "print_sale", # Nuevo flujo de impresión integrado
            "debs", "debsPaid", "products"
        ]
```

## Reto superado

Asegurar que las serializaciones profundas `many=True` (como `products` o `debsPaid`) no incrementaran drásticamente los tiempos de carga de la API ni ahogaran el servidor, aplicando las relaciones de forma opcional (`required=False`) y depurando a nivel de vista el acceso de QuerySets con filtros optimizados.
