import supabase, { supabaseSession } from './supabaseClient.js';

// Obtiene el cliente activo (persistente o de pestaña) y el userId
export async function getActiveClientAndUser() {
  const [{ data: s1 }, { data: s2 }] = await Promise.all([
    supabase.auth.getSession(),
    supabaseSession.auth.getSession(),
  ]);
  const session = s1?.session || s2?.session;
  const client = s1?.session ? supabase : s2?.session ? supabaseSession : null;
  const userId = session?.user?.id || null;
  return { client, userId, session };
}

// Busca (y opcionalmente crea) la página del usuario para un tipo dado
export async function getOrCreatePage(client, userId, type) {
  if (!client || !userId || !type) return null;
  const { data, error } = await client
    .from('pages')
    .select('id')
    .eq('user_id', userId)
    .eq('type', type)
    .single();
  if (data?.id) return data.id;
  // si no existe, intenta crearla
  const { data: ins, error: insErr } = await client
    .from('pages')
    .insert([{ user_id: userId, type, created_at: new Date().toISOString() }])
    .select('id')
    .single();
  if (insErr) return null;
  return ins?.id || null;
}

export async function loadContent(type) {
  const { client, userId } = await getActiveClientAndUser();
  if (!client || !userId) return { pageId: null, content: {} };
  const pageId = await getOrCreatePage(client, userId, type);
  if (!pageId) return { pageId: null, content: {} };
  const { data, error } = await client
    .from('page_fields')
    .select('field_key, field_value')
    .eq('page_id', pageId);
  if (error) return { pageId, content: {} };
  const content = {};
  for (const row of data || []) {
    content[row.field_key] = row.field_value;
  }
  return { pageId, content };
}

export async function saveContent(type, updates) {
  const { client, userId } = await getActiveClientAndUser();
  if (!client || !userId) throw new Error('No autenticado');
  const pageId = await getOrCreatePage(client, userId, type);
  if (!pageId) throw new Error('No se pudo obtener la página');
  // Prepara filas para upsert
  const rows = Object.entries(updates).map(([k, v]) => ({
    page_id: pageId,
    field_key: k,
    field_value: v,
    updated_at: new Date().toISOString(),
  }));
  const { error } = await client
    .from('page_fields')
    .upsert(rows, { onConflict: 'page_id,field_key' });
  if (error) throw error;
  return true;
}
