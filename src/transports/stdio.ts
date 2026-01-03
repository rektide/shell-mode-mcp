import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

export async function connectStdio(command: string): Promise<Client> {
	const [cmd, ...args] = command.split(" ");

	const transport = new StdioClientTransport({
		command: cmd,
		args,
	});

	const client = new Client({
		name: "shell-mode-mcp",
		version: "1.0.0",
	});

	await client.connect(transport);

	return client;
}
