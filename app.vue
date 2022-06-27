<template>
	<div class="flex flex-row min-h-full py-16 px-8">
		<div class="flex-grow" />
		<div class="flex flex-col max-w-md w-full">
			<div class="flex-grow" />

			<header class="text-center mb-3 text-2xl">
				Atom Community CI Builds
			</header>
			<div class="text-center mb-16">
				It is here that you will easily be able to find and download CI builds of the community fork of Atom.
			</div>

			<div>
				<run v-for="run in runs.value" :run="run" />
			</div>

			<footer class="text-sm text-center mt-10">
				by
				<a
					href="https://github.com/autumnblazey"
					target="_blank"
					class="cursor-pointer hover:text-[#ffd152]"
				>
					Autumn Meadow
				</a>

				<br>

				for
				<a
					href="https://github.com/atom-community/atom"
					target="_blank"
					class="cursor-pointer hover:text-[#ffd152]"
				>
					Atom Community
				</a>
				(pending rebrand)

				<br>

				<a
					href="https://github.com/autumnblazey/atomcommunity-pipelines"
					target="_blank"
					class="hover:text-[#ffd152]"
				>
					source code for this site
				</a>
			</footer>

			<div class="flex-grow" />
		</div>
		<div class="flex-grow" />
	</div>
</template>

<script setup lang="ts">
	const bypass_cache = is_production();
	let runs = await use_runs(bypass_cache);
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
