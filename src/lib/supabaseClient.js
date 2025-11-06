// Cliente de Supabase centralizado
// Lee las variables de entorno de Vite (prefijo VITE_)
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Esto ayuda a detectar configuración faltante durante el desarrollo
  // Evita lanzar en producción si prefieres manejarlo distinto
  // eslint-disable-next-line no-console
  console.warn(
    '[Supabase] Faltan variables de entorno VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY.'
  )
}

// Cliente persistente (localStorage)
export const supabasePersistent = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

// Cliente de sesión (sessionStorage): se borra al cerrar la pestaña
export const supabaseSession = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storage: typeof window !== 'undefined' ? window.sessionStorage : undefined,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

// Compatibilidad: export por defecto
export const supabase = supabasePersistent
export default supabase

export const getSupabase = (keepLoggedIn = true) =>
  keepLoggedIn ? supabasePersistent : supabaseSession

// Asegura que exista una fila básica en public.users con la PK = auth.uid()
// No sobreescribe columnas existentes (solo envía el id), para no pisar "type" posteriormente
export async function ensureUserRow(client, userId) {
  try {
    if (!client || !userId) return;
    const { error } = await client
      .from('users')
      .upsert({ id: userId }, { onConflict: 'id' });
    if (error) {
      // eslint-disable-next-line no-console
      console.warn('[Supabase] ensureUserRow error:', error.message);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[Supabase] ensureUserRow exception:', e?.message || e);
  }
}
