import { list_runs_validator, list_artifacts_validator } from "./schema";
import type { ListRuns, ListArtifacts } from "./schema";
import { z, object, string } from "zod";

type ListRunsCached = z.infer<typeof list_runs_cached_validator>;
const list_runs_cached_validator = object({
	timestamp: string(),
	runs: list_runs_validator
});

type ListArtifactsCached = z.infer<typeof list_artifacts_cached_validator>;
const list_artifacts_cached_validator = object({
	timestamp: string(),
	artifacts: list_artifacts_validator
});

const runs_key = "runs";
const artifacts_key = (run_id: number) => `artifacts-${run_id}`;

export function get_runs_cache() {
	let stored = localStorage.getItem(runs_key);
	if (!stored) return undefined;

	try {
		let parsed = list_runs_cached_validator.parse(JSON.parse(stored));
		return parsed;
	} catch {
		return undefined;
	}
}

export function cache_runs(runs: ListRuns) {
	let cached_obj: ListRunsCached = { runs, timestamp: new Date().toString() };
	localStorage.setItem(runs_key, JSON.stringify(cached_obj));
}

export function get_artifacts_cache(run_id: number) {
	let stored = localStorage.getItem(artifacts_key(run_id));
	if (!stored) return undefined;

	try {
		let parsed = list_artifacts_cached_validator.parse(JSON.parse(stored));
		return parsed;
	} catch {
		return undefined;
	}
}

export function cache_artifacts(run_id: number, artifacts: ListArtifacts) {
	let cached_obj: ListArtifactsCached = { artifacts, timestamp: new Date().toString() };
	localStorage.setItem(artifacts_key(run_id), JSON.stringify(cached_obj));
}
