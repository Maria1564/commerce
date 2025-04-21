import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfig from "./tsconfig.app.json";

// eslint-disable-next-line no-undef
const SRC_PATH = path.resolve(__dirname, "src");

const parseTsConfigPaths = (
  paths: Record<string, string[]>
): Record<string, string> => {
  const viteAliases: Record<string, string> = {};

  Object.entries(paths).forEach(([alias, [pathPattern]]) => {
    const aliasKey = alias.replace(/\/\*$/, "");
    const pathValue = pathPattern.replace(/\/\*$/, "");
    const resolvedPath = path.join(SRC_PATH, pathValue);
    viteAliases[aliasKey] = resolvedPath;
  });

  return viteAliases;
};

export default defineConfig({
  base: '/commerce/',
  plugins: [react()],
  resolve: {
    alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});