import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

export async function connectSSE(url: string): Promise<Client> {
	const transport = new StreamableHTTPClientTransport(new URL(url));

	const client = new Client({
		name: "shell-mode-mcp",
		version: "1.0.0",
	});

	await client.connect(transport);

	return client;
}
