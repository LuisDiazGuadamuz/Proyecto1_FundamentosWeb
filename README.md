# Samara Rentals - SPA Real Estate

Aplicacion web SPA para venta de propiedades, construida con React + Vite + TailwindCSS.

## Tecnologias

- React
- Vite
- TailwindCSS
- React Router
- Service Worker para soporte offline avanzado

## Estructura

src/
- assets/
- components/
- pages/
- services/
- hooks/
- context/
- router/
- utils/
- App.jsx

## Scripts

- npm run dev
- npm run build
- npm run preview
- npm run lint
- npm run deploy

## Ejecutar en local

1. npm install
2. npm run dev

## Funcionalidad offline

- Cache First para recursos estaticos (CSS, JS, imagenes)
- Network First para respuestas de API (properties.json)
- Fallback offline con pagina dedicada cuando no hay conexion

## Rutas SPA

- /
- /properties
- /properties/:id
- /contact

## Deploy en GitHub Pages

Este proyecto ya esta preparado para publicarse en:
https://github.com/LuisDiazGuadamuz/Proyecto1_FundamentosWeb.git

Pasos:

1. Verifica que el remoto del repositorio este configurado.
2. Ejecuta:
   - npm run deploy
3. En GitHub, activa GitHub Pages usando la rama gh-pages.

Nota: El `base` de Vite esta configurado como `/Proyecto1_FundamentosWeb/`.
