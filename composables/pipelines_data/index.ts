import { fetch_runs, fetch_artifacts } from "./fetchers";
import { get_runs_cache, get_artifacts_cache, cache_runs, cache_artifacts } from "./cache";

export async function use_runs(bypass_cache = true) {
	let cached = bypass_cache ? undefined : get_runs_cache();
	if (cached) {
		if (is_development()) console.log(cached);
		return cached.runs;
	}

	let runs = await fetch_runs();
	if (!bypass_cache) cache_runs(runs);

	return runs;
}

export async function use_artifacts(run_id: number, bypass_cache = true) {
	let cached = bypass_cache ? undefined : get_artifacts_cache(run_id);
	if (cached) {
		if (is_development()) console.log(cached);
		return cached.artifacts;
	}

	let artifacts = await fetch_artifacts(run_id);
	if (!bypass_cache) cache_artifacts(run_id, artifacts);

	return artifacts;
}

export type { Run, ListArtifacts } from "./schema";
