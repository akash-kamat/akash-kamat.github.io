import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const supabaseUrl = process.env.VITE_SUPABASE_URL || env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY;

  if (mode === 'production' && (!supabaseUrl || !supabaseKey)) {
    console.warn("\n\x1b[33m%s\x1b[0m\n", "⚠️  WARNING: Supabase environment variables are missing! The app will not work correctly.");
    console.warn("Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your GitHub Repository Secrets.\n");
  }

  return {
    base:
      process.env.GITHUB_REPOSITORY &&
        !process.env.GITHUB_REPOSITORY.split('/')[1].includes('github.io')
        ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
        : '/',
    plugins: [react(), tailwindcss()],
  }
})
