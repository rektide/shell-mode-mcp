import type { CommandContext } from "gunshi";

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
		if (listResources) {
			ctx.log("Resources: list");
		} else if (listPrompts) {
			ctx.log("Prompts: list");
		} else {
			ctx.log("Tools: list");
		}
	},
};
