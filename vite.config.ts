import {
	vanillaExtractPlugin,
} from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react";
import sonda from "sonda/vite";
import {
	defineConfig,
} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config
const config = defineConfig({
	build: {
		// Required for Sonda.
		sourcemap: true,
	},
	plugins: [
		tsconfigPaths({
			configNames: [
				"tsconfig.app.json",
			],
		}),
		react(),
		vanillaExtractPlugin(),
		sonda(),
	],
});

export default config;
