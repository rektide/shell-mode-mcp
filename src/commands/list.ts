import type { CommandContext } from "gunshi";
import { connectStdio, connectSSE } from "../transports/index.ts";
import { handleMCPError } from "../errors.ts";
import { formatMCPResponse, type OutputFormat } from "../formatter.ts";

export const listCommand = {
	name: "list",
	description: "List available tools, resources, or prompts",
	args: {
		resources: {
			type: "boolean",
			description: "List resources instead of tools",
		},
		prompts: {
			type: "boolean",
			description: "List prompts instead of tools",
		},
	},
	run: async (ctx: CommandContext) => {
		const { resources: listResources, prompts: listPrompts } = ctx.values;
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

			let result;
			if (listResources) {
				result = await client.listResources();
			} else if (listPrompts) {
				result = await client.listPrompts();
			} else {
				result = await client.listTools();
			}

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
