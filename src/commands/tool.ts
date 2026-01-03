import type { CommandContext } from "gunshi";

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
				description: "Tool arguments",
			},
	},
	run: async (ctx: CommandContext) => {
		const { name, arg } = ctx.values;
		ctx.log(`Tools: call ${name}`, arg || []);
	},
};
