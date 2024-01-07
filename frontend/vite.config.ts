import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export const BACK_PORT = process.env.BACK_PORT || 4000;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
