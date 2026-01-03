import type { CommandContext } from "gunshi";

export const promptCommand = {
	name: "prompt",
	description: "Get a prompt",
	args: {
		name: {
				type: "string",
				description: "Prompt name",
				required: true,
			},
		arg: {
				type: "string",
				array: true,
				description: "Prompt arguments",
			},
	},
	run: async (ctx: CommandContext) => {
		const { name, arg } = ctx.values;
		ctx.log(`Prompts: get ${name}`, arg || []);
	},
};
