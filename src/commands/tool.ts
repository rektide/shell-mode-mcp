import type { CommandContext } from "gunshi";
import { connectStdio, connectSSE } from "../transports/index.ts";
import { handleMCPError } from "../errors.ts";
import { formatMCPResponse, type OutputFormat } from "../formatter.ts";

export const toolCommand = {
	name: "tool",
	description: "Call a tool",
	args: {
		name: {
				type: "string",
				description: "Tool name",
				required: true,
			},
		arg: {
				type: "string",
				array: true,
				description: "Tool arguments in format key=value",
			},
	},
	run: async (ctx: CommandContext) => {
		const { name, arg } = ctx.values;
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

			const toolArgs = arg?.reduce<Record<string, any>>((acc, argStr) => {
				const [key, value] = argStr.split("=", 2);
				if (key && value !== undefined) {
					try {
						acc[key] = JSON.parse(value);
					} catch {
						acc[key] = value;
					}
				}
				return acc;
			}, {}) || {};

			const result = await client.callTool({
				name,
				arguments: toolArgs,
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
