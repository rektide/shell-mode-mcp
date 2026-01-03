import { Client } from "@modelcontextprotocol/sdk/client/index.js";

export class MCPConnectionError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "MCPConnectionError";
	}
}

export class MCPProtocolError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "MCPProtocolError";
	}
}

export class MCPValidationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "MCPValidationError";
	}
}

export function handleMCPError(error: unknown): string {
	if (error instanceof MCPConnectionError) {
		return `Connection failed: ${error.message}`;
	}
	if (error instanceof MCPProtocolError) {
		return `Protocol error: ${error.message}`;
	}
	if (error instanceof MCPValidationError) {
		return `Validation error: ${error.message}`;
	}
	if (error instanceof Error) {
		if (error.message.includes("ECONNREFUSED")) {
			return "Connection refused: server may not be running or is unavailable";
		}
		if (error.message.includes("ENOTFOUND")) {
			return "Host not found: check server URL/address";
		}
		if (error.message.includes("ETIMEDOUT")) {
			return "Connection timed out: server did not respond in time";
		}
		return error.message;
	}
	return String(error);
}
