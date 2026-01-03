import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { MCPConnectionError } from "../errors.ts";

export async function connectStdio(command: string): Promise<Client> {
	const [cmd, ...args] = command.split(" ");

	if (!cmd) {
		throw new MCPConnectionError("Invalid command format");
	}

	const transport = new StdioClientTransport({
		command: cmd,
		args,
	});

	const client = new Client({
		name: "shell-mode-mcp",
		version: "1.0.0",
	});

	try {
		await client.connect(transport);
	} catch (error) {
		if (error instanceof Error) {
			throw new MCPConnectionError(`Failed to connect to stdio server: ${error.message}`);
		}
		throw new MCPConnectionError("Failed to connect to stdio server");
	}

	return client;
}
