import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import dotenv from 'dotenv';

dotenv.config();
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [preact()],
  server: {
  },
})
 
// "http://localhost:5173/speech/getSpeechList"