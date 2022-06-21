import { defineNuxtConfig } from "nuxt";
import path from "path";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	telemetry: false,
	target: "static",
	ssr: false,
	app: {
		baseURL: "/atomcommunity-pipelines/"
	},
	alias: {
		zod: path.resolve("./node_modules/_zod/src/index.ts")
	},
	vite: {
		build: {
			minify: "terser",
			terserOptions: {
				compress: {
					passes: 3
				}
			}
		}
	},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {}
		}
	},
	typescript: {
		shim: false,
		strict: true,
		typeCheck: "build",
		tsConfig: {
			compilerOptions: {
				skipLibCheck: false
			}
		}
	}
});
