<template>
	<div class="
		block px-5 py-3 min-w-fit
		border-[#4d4b4d]
		border-l-2 border-r-2
		first:border-t-2 border-b-2
		first:rounded-t-xl last:rounded-b-xl
	">
		<div :class="expand && 'pb-3'" class="flex flex-row">
			<span v-if="run.result === 'succeeded'" class="text-green-400" title="CI pipeline was a success">
				(S)
			</span>
			<span v-else-if="run.result === 'failed'" class="text-red-400" title="CI pipeline was a failure">
				(F)
			</span>

			&nbsp;

			<div
				@click="expand = !expand"
				class="flex-grow cursor-pointer"
			>
				<span class="hover:text-[#ffd152]">Run {{ run.id }}</span>
			</div>

			<a
				:href="run._links.web.href"
				target="_blank"
				@click.stop
				class="cursor-pointer hover:text-[#ffd152]"
			>
				(link to azure)
			</a>
		</div>

		<div v-if="expand" class="pt-3 border-t-2 border-[#4d4b4d]">
			<template v-if="loading">
				loading...
			</template>
			<template v-else>
				<div class="text-lg pb-2">
					<b>Artifacts</b>
				</div>
				<div v-for="artifact in artifacts">
					<a
						:href="artifact.resource.downloadUrl"
						class="whitespace-nowrap cursor-pointer hover:text-[#ffd152]"
					>
						{{ artifact.name }}
					</a>
					<br>
				</div>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { Run, ListArtifacts } from "~/composables/pipelines_data";

	const props = defineProps<{
		run: Run;
	}>();

	// whether or not the specific release has expanded
	const expand = ref(false);

	// lazy fetch the artifacts data
	// couldn't find a better way to do it, i need a better way to do this
	const loading = ref(true);
	const artifacts = ref<ListArtifacts["value"]>([]);
	const stop_watching_load = watch(expand, () => {
		stop_watching_load();

		use_artifacts(props.run.id, is_production()).then(a => {
			artifacts.value.push(...a.value);
			loading.value = false;
		});
	}, { flush: "sync" });
</script>
