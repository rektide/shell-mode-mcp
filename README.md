# shell-mode-mcp

A TypeScript CLI tool for human interaction with Model Context Protocol (MCP) servers via stdio or HTTP streaming transports.

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Development Plan](#development-plan)
- [Contributing](#contributing)
- [License](#license)

## Background

This tool provides a command-line interface for humans to interact with MCP servers. MCP is an open protocol that standardizes how applications provide context to LLMs through resources, tools, and prompts. While most MCP clients are programmatic (integrated into LLM apps), this tool offers a direct human-accessible CLI for testing, debugging, and interactive use with MCP servers.

## Install

```sh
pnpm install
```

## Usage

Every command connects to an MCP server. Use either `--stdio` (runs a command) or `--sse` (HTTP streaming URL) to specify the server.

```sh
# List tools from a stdio server
node src/cli.ts list --stdio "python server.py"

# List tools from an HTTP server
node src/cli.ts list --sse "http://localhost:3000/mcp"

# List resources
node src/cli.ts list --resources --sse "http://localhost:3000/mcp"

# List prompts
node src/cli.ts list --prompts --stdio "python server.py"

# Call a tool
node src/cli.ts call --name "tool-name" --arg param=value --stdio "node server.js"

# Read a resource
node src/cli.ts read --uri "resource://path" --stdio "python server.py"

# Get a prompt with arguments
node src/cli.ts get --name "prompt-name" --arg dept=engineering --stdio "node server.js"
```

## Development Plan

### Phase 1: Core Infrastructure

- Set up project structure with TypeScript
- Install dependencies:
  - `@modelcontextprotocol/sdk` for MCP client
  - `gunshi@beta` for CLI framework
  - `zod` for schema validation
  - `tsdown` for TypeScript compilation
  - `vitest` for testing
  - `oxfmt` for code formatting

### Phase 2: CLI Framework

- Initialize Gunshi CLI with command structure
- Implement command groups with connection flags:
  - `tools` - Tool operations (list, call)
  - `resources` - Resource operations (list, read)
  - `prompts` - Prompt operations (list, get)
- Add `--stdio` flag for stdio transport (takes command string)
- Add `--sse` flag for HTTP streaming transport (takes URL)
- Add global configuration options (verbose, quiet, config file)

### Phase 3: Transport Implementation

- Implement `StdioClientTransport` wrapper
  - Spawn server process with command/args
  - Handle connection lifecycle
  - Support configurable command arguments
- Implement `StreamableHTTPClientTransport` wrapper
  - Connect to HTTP endpoint
  - Handle session management
  - Support custom headers and auth

### Phase 4: MCP Client Operations

- Tool operations:
  - `listTools()` with pretty output
  - `callTool()` with JSON schema validation for arguments
  - Tab completion for tool names and arguments
- Resource operations:
  - `listResources()` with metadata display
  - `readResource()` with formatted output
  - Tab completion for resource URIs
- Prompt operations:
  - `listPrompts()` with descriptions
  - `getPrompt()` with argument completion support
- Argument completion:
  - Integrate `complete()` for argument suggestions
  - Implement interactive completion hooks

### Phase 5: Interactive Features

- Tab completion system:
  - Command completion (tools, resources, prompts)
  - Argument name completion based on tool schemas
  - Argument value completion where available
  - Resource URI completion
  - Prompt name completion
- Session persistence:
  - Save connection state between commands
  - Support for named connections/sessions
  - Config file for saved server URLs and commands
- Output formatting:
  - Multiple output formats (json, pretty, table)
  - Colored terminal output for readability
  - Progress indicators for long operations

### Phase 6: Advanced Features

- Server-initiated requests:
  - Handle elicitation requests from server
  - Handle sampling requests (with optional LLM integration)
  - Interactive prompts for user input
- Event subscriptions:
  - Subscribe to notifications
  - Real-time updates display
- Error handling:
  - Graceful error messages
  - Retry mechanisms for transient failures
  - Debug mode for protocol-level inspection

### Phase 7: Testing and Documentation

- Unit tests for CLI commands
- Integration tests with mock MCP servers
- End-to-end testing with real MCP servers
- Comprehensive documentation
- Example configurations for common MCP servers

## Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## License

MIT © [Your Name]
