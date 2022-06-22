/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app.vue",
		"./{assets,components,composables,layouts,pages}/**/*.{vue,ts,js,tsx,jsx}"
	],
	theme: {
		extend: {}
	},
	plugins: []
}
