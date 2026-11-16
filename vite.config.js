import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// BASE=/shaddai1-web/ para GitHub Pages (repo de proyecto); "/" para Docker/local.
const base = process.env.BASE || "/";

export default defineConfig({ base, plugins: [react()], build: { target: "es2020" } });
