<template>
	<div class="flex flex-row min-h-full py-16 px-8">
		<div class="flex-grow" />
		<div class="flex flex-col max-w-md w-full">
			<div class="flex-grow" />

			<div>
				<template v-for="run in runs.value">
					<run :run="run" />
				</template>
			</div>

			<div class="flex-grow" />
		</div>
		<div class="flex-grow" />
	</div>
</template>

<script setup lang="ts">
	let runs = await use_runs();
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
			@apply h-full bg-[#343335] text-[#eedab9];
		}
	}
</style>
