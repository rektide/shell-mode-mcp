import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { MCPConnectionError } from "../errors.ts";

export async function connectSSE(url: string): Promise<Client> {
	try {
		new URL(url);
	} catch {
		throw new MCPConnectionError(`Invalid URL: ${url}`);
	}

	const transport = new StreamableHTTPClientTransport(new URL(url));

	const client = new Client({
		name: "shell-mode-mcp",
		version: "1.0.0",
	});

	try {
		await client.connect(transport);
	} catch (error) {
		if (error instanceof Error) {
			throw new MCPConnectionError(`Failed to connect to SSE server: ${error.message}`);
		}
		throw new MCPConnectionError("Failed to connect to SSE server");
	}

	return client;
}
