import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Project = {
  id: string
  user_id: string
  title: string
  description: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  images: string[]
  tags: string[]
  published: boolean
  created_at: string
  updated_at: string
}