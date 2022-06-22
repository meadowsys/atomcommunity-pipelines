import { list_runs_validator, list_artifacts_validator } from "./schema";

const list_runs_url = "https://dev.azure.com/atomcommunity/atomcommunity/_apis/pipelines/10/runs?api-version=6.0-preview.1";
const list_artifacts = (run_id: number) => `https://dev.azure.com/atomcommunity/atomcommunity/_apis/build/builds/${run_id}/artifacts?api-version=7.0&%24format=zip`;

// todo attempt to use nuxt $fetch api?

export async function fetch_runs() {
	const unvalidated_response = await fetch(list_runs_url).then(j => j.json());
	console.log(unvalidated_response);
	const listed_runs = list_runs_validator.parse(unvalidated_response);

	return listed_runs;
}

export async function fetch_artifacts(run_id: number) {
	const unvalidated_response = await fetch(list_artifacts(run_id)).then(j => j.json());
	console.log(unvalidated_response);
	const listed_artifacts = list_artifacts_validator.parse(unvalidated_response);

	return listed_artifacts;
}
