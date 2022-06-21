import { list_runs_validator, list_artifacts_validator } from "./schema";

const list_runs_url = "https://dev.azure.com/atomcommunity/atomcommunity/_apis/pipelines/10/runs?api-version=6.0-preview.1";
const list_artifacts = (run_id: number) => `https://dev.azure.com/atomcommunity/atomcommunity/_apis/build/builds/${run_id}/artifacts?api-version=7.0&%24format=zip`;

// uses nuxt $fetch api which doesn't seem to work properly (at least in dev mode)?

// // list runs
// export async function fetch_runs() {
// 	const unvalidated_response = await $fetch(list_runs_url);
// 	const listed_runs = list_runs_validator.parse(unvalidated_response);

// 	return listed_runs;
// }

// // fetch artifacts for a specific run
// export async function fetch_artifacts(run_id: number) {
// 	const unvalidated_response = await $fetch(list_artifacts(run_id));
// 	const listed_artifacts = list_artifacts_validator.parse(unvalidated_response);

// 	return listed_artifacts;
// }

// standard fetch api

// list runs
export async function fetch_runs() {
	const unvalidated_response = await fetch(list_runs_url).then(j => j.json());
	console.log(unvalidated_response);
	const listed_runs = list_runs_validator.parse(unvalidated_response);

	return listed_runs;
}

// fetch artifacts for a specific run
export async function fetch_artifacts(run_id: number) {
	const unvalidated_response = await fetch(list_artifacts(run_id)).then(j => j.json());
	console.log(unvalidated_response);
	const listed_artifacts = list_artifacts_validator.parse(unvalidated_response);

	return listed_artifacts;
}
