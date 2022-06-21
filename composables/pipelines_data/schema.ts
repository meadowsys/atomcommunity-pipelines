import { z, number, object, string } from "zod";

export const run_validator = object({
	id: number()
});

export type ListRuns = z.infer<typeof list_runs_validator>;
export const list_runs_validator = object({
	count: number(),
	value: run_validator.array()
});

export const artifact_validator = object({
	// id: number(),
	name: string(),
	resource: object({
		downloadUrl: string()
	})
});

export type ListArtifacts = z.infer<typeof list_artifacts_validator>;
export const list_artifacts_validator = object({
	count: number(),
	value: artifact_validator.array()
});
