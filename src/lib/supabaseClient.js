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

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
