# Portfolio

Bienvenido a la base del proyecto Portfolio, construido con el framework [Astro](https://astro.build/) utilizando un enfoque minimalista y de alto rendimiento.

## 🚀 Estructura del Proyecto

Dentro del proyecto, la estructura de carpetas y archivos principal es la siguiente:

```text
/
├── public/          # Archivos estáticos e imágenes que se envían directamente al cliente
├── src/
│   ├── components/  # Componentes reutilizables (.astro, .tsx, .vue, etc.)
│   ├── layouts/     # Plantillas contenedoras para múltiples páginas
│   ├── pages/       # Páginas y rutas, cada archivo aquí es expuesto como una ruta
│   └── styles/      # Estilos CSS generales o variables globales
├── astro.config.mjs # Configuración principal de Astro e integraciones
├── package.json     # Metadatos del proyecto y dependencias
└── tsconfig.json    # Configuración de TypeScript
```

## 🧞 Comandos y Scripts (pnpm)

Todo el ambiente y flujo de desarrollo funciona mediante la terminal usando **pnpm**:

| Comando                      | Acción                                                                  |
| :--------------------------- | :---------------------------------------------------------------------- |
| `pnpm install`               | Instala todas las dependencias del proyecto.                            |
| `pnpm run dev`               | Inicia el servidor de desarrollo local, usualmente en `localhost:4321`. |
| `pnpm run build`             | Genera la versión estática y optimizada para producción (`/dist`).      |
| `pnpm run preview`           | Previsualiza el resultado localmente antes de desplegar.                |
| `pnpm check`                 | Lanza el chequeo de diagnósticos y tipos del proyecto.                  |

## 🛠 Entorno y Configuración Avanzada

Esta es una plantilla en blanco construida según sus directrices iniciales ("Minimal"). Algunas notas para futuras implementaciones a medida que crezca el código:

- **Hosting/Despliegue estático:** Al basarse en SSG (Generación de Sitio Estático) por default, puede hospedar el contenido del folder `dist` de forma nativa en **VPS**, **Netlify**, o **Vercel** sin necesidad de configuraciones extendidas.
- **SSR e Integraciones:** Si el portfolio crece y requiere llamadas a bases de datos o funcionalidades de servidor (SSR), se instalan los **Adapters** necesarios usando el CLI: `pnpm astro add netlify`, `pnpm astro add vercel`, o `pnpm astro add node` para su VPS.
- **Estilos UI:** Se podrá integrar Vanilla CSS, Tailwind (`pnpm astro add tailwind`), u otros frameworks visuales sin problema dentro de la robustez base.
