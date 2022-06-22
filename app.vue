<template>
	<div>
		runs:<br>
		<div v-for="run in runs.value">
			{{ run.id }}
		</div>

		artifacts for latest run ({{ runs.value[0].id }}):
		<div v-for="artifact in artifacts.value">
			<a :href="artifact.resource.downloadUrl">{{ artifact.name }}</a>
		</div>
	</div>
</template>

<script setup lang="ts">
	let runs = await use_runs();
	let artifacts = await use_artifacts(runs.value[0].id);
</script>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	@layer base {
		* {
			@apply selection:bg-[#dcc4fe];
		}
		html, body, #__nuxt {
			@apply h-full;
		}
	}
</style>
