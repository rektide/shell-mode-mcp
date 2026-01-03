#!/usr/bin/env node
import { cli } from "gunshi";
import { listCommand } from "./commands/list.ts";
import { toolCommand } from "./commands/tool.ts";
import { resourceCommand } from "./commands/resource.ts";
import { promptCommand } from "./commands/prompt.ts";

await cli(process.argv.slice(2), async () => {
	console.log("Available commands: list, tool, resource, prompt");
}, {
	name: "shell-mode-mcp",
	description: "CLI for interacting with MCP servers",
	version: "1.0.0",
	args: {
		stdio: {
			type: "string",
			description: "Connect to stdio MCP server (command to run)",
		},
		sse: {
			type: "string",
			description: "Connect to HTTP streaming MCP server (URL)",
		},
		verbose: {
			type: "boolean",
			short: "v",
			description: "Enable verbose output",
		},
		quiet: {
			type: "boolean",
			short: "q",
			description: "Suppress non-error output",
		},
		config: {
			type: "string",
			description: "Path to config file",
		},
		format: {
			type: "string",
			description: "Output format (json or pretty)",
		},
	},
	subCommands: {
		list: listCommand,
		tool: toolCommand,
		resource: resourceCommand,
		prompt: promptCommand,
	},
});
