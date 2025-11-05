# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Supabase (Auth/DB)

Pasos para usar Supabase en este proyecto:

1) Instalar el cliente oficial

```
npm install @supabase/supabase-js
```

2) Variables de entorno

Duplica `.env.local.example` como `.env.local` y completa los valores:

```
VITE_SUPABASE_URL=tu_url_de_proyecto
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

3) Cliente centralizado

Usa `src/lib/supabaseClient.js` para acceder al cliente:

```js
import { supabase } from '../lib/supabaseClient'

// Ejemplo: iniciar sesión
await supabase.auth.signInWithPassword({ email, password })
```

Nota: Los archivos `.env*` están ignorados por git. No publiques tus claves.
