import type { CommandContext } from "gunshi";
import { connectStdio, connectSSE } from "../transports/index.ts";
import { handleMCPError } from "../errors.ts";
import { formatMCPResponse, type OutputFormat } from "../formatter.ts";

export const resourceCommand = {
	name: "resource",
	description: "Read a resource",
	args: {
		uri: {
				type: "string",
				description: "Resource URI",
				required: true,
			},
	},
	run: async (ctx: CommandContext) => {
		const { uri } = ctx.values;
		const args = ctx.globalArgs || {};

		const stdio = args.stdio as string | undefined;
		const sse = args.sse as string | undefined;
		const format = (args.format as OutputFormat) || "json";

		if (!stdio && !sse) {
			ctx.error("Error: Either --stdio or --sse must be specified");
			return;
		}

		let client;
		try {
			if (stdio) {
				client = await connectStdio(stdio);
			} else if (sse) {
				client = await connectSSE(sse);
			} else {
				return;
			}

			const result = await client.readResource({
				uri,
			});

			ctx.log(formatMCPResponse(result, format));
		} catch (error) {
			ctx.error(handleMCPError(error));
		} finally {
			if (client) {
				try {
					await client.close();
				} catch {
				}
			}
		}
	},
};
