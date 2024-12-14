import { useMutation } from "convex/react";
import { FunctionReference } from "convex/server";
import { useState } from "react";

export function useMutationState(mutation: FunctionReference<"mutation">) {
	const [pending, setPending] = useState(false);

	const mutationFn = useMutation(mutation);

	async function mutate(payload: any) {
		setPending(true);

		try {
			const res = await mutationFn(payload);
			return res;
		} catch (error) {
			throw error;
		} finally {
			setPending(false);
		}
	}

	return {
		mutate,
		pending,
	};
}
