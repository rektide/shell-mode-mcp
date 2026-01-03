export type OutputFormat = "json" | "pretty";

interface FormatOptions {
	indent?: number;
	color?: boolean;
}

export function formatMCPResponse<T>(data: T, format: OutputFormat, options: FormatOptions = {}): string {
	const { indent = 2 } = options;

	if (format === "json") {
		return JSON.stringify(data, null, indent);
	}

	return prettyPrint(data, indent);
}

function prettyPrint(data: unknown, indent: number): string {
	if (data === null || data === undefined) {
		return "null";
	}

	if (typeof data === "string") {
		return data;
	}

	if (typeof data === "number" || typeof data === "boolean") {
		return String(data);
	}

	if (Array.isArray(data)) {
		if (data.length === 0) {
			return "[]";
		}
		return data.map((item) => prettyPrint(item, indent)).join("\n");
	}

	if (typeof data === "object") {
		const obj = data as Record<string, unknown>;
		const keys = Object.keys(obj);
		if (keys.length === 0) {
			return "{}";
		}

		return keys
			.map((key) => {
				const value = obj[key];
				const formattedValue = prettyPrint(value, indent);
				return `${key}: ${formattedValue}`;
			})
			.join("\n");
	}

	return String(data);
}
