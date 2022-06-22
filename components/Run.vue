<template>
	<div class="
		block px-5 py-3 min-w-fit
		border-[#4d4b4d]
		border-l-2 border-r-2
		first:border-t-2 border-b-2
		first:rounded-t-xl last:rounded-b-xl
	">
		<div @click="expand = !expand">run id {{ run.id }}</div>

		<template v-if="expand">
			<template v-if="loading">
				<!-- loading -->
				loading...
			</template>
			<template v-else>
				artifacts:
				<div v-for="artifact in artifacts">
					<a :href="artifact.resource.downloadUrl" class="whitespace-nowrap">{{ artifact.name }}</a>
					<br>
				</div>
			</template>
		</template>
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

		use_artifacts(props.run.id, false).then(a => {
			artifacts.value.push(...a.value);
			loading.value = false;
		});
	}, { flush: "sync" });
</script>
