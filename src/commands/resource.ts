import type { CommandContext } from "gunshi";

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
		ctx.log(`Resources: read ${uri}`);
	},
};
