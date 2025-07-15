# 🏭 FactoryFlow

**FactoryFlow** es una aplicación frontend desarrollada con React 19, Vite y Tailwind CSS, orientada a la visualización, gestión y mejora de procesos industriales. El proyecto está diseñado con un enfoque modular y escalable, ideal para entornos que requieren soluciones rápidas, intuitivas y adaptadas al flujo de trabajo en planta.

---

## 🚀 Tecnologías principales

| Categoría        | Herramientas / Librerías                          |
|------------------|---------------------------------------------------|
| Lenguaje         | TypeScript                                        |
| Framework        | React 19 + Vite                                   |
| UI & Diseño      | Tailwind CSS, MUI (Material UI), Emotion          |
| Estado & Eventos | React Router DOM, `mitt` (EventBus ligero)        |
| Utilidades       | Lodash, Dotenv, Axios                             |
| Estilo & Linting | ESLint, PostCSS                                   |
| Tipado           | TypeScript, tsconfig paths                        |

---

## 📦 Scripts principales

| Comando         | Descripción                       |
|-----------------|------------------------------------|
| `npm run dev`   | Inicia el servidor de desarrollo  |
| `npm run build` | Genera el build optimizado        |
| `npm run lint`  | Ejecuta el linter                 |
| `npm run preview` | Previsualiza el build generado  |

---

## 📁 Estructura destacada del proyecto

src/
├── components/       # Componentes reutilizables
├── pages/            # Vistas o pantallas principales
├── hooks/            # Hooks personalizados
├── services/         # Lógica de conexión (API, datos)
├── styles/           # Estilos globales y tailwind
├── types.ts          # Definiciones TypeScript
├── eventBus.ts       # Gestión de eventos entre componentes

