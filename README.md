# YouTube & Shorts Analytics MCP Server

An open-source **Model Context Protocol (MCP)** server that gives Claude, Cursor, and other AI agents direct access to YouTube video & Shorts transcripts, retention hooks, metadata, tags, and top audience comments.

## Tools Included

| Tool | Description | API Key Needed? |
| :--- | :--- | :--- |
| `get_video_transcript` | Fetch full video or Shorts transcript text | No |
| `get_shorts_hook` | Extract opening 10s (or custom duration) for retention analysis | No |
| `get_video_metadata` | Get title, description, tags, views, likes, and comment count | Yes |
| `get_top_comments` | Fetch top comments sorted by relevance for sentiment analysis | Yes |

## Local Setup

Use Node.js 20 or later. Open a terminal in the project directory and run:

```bash
npm ci
npm run build
```

## Connect to Codex

After building, register the server with the absolute path to `build/index.js`:

```sh
codex mcp add youtube-analytics -- node "/absolute/path/to/youtube-analytics-mcp/build/index.js"
codex mcp list
```

Start a new Codex session to load the server. To pass an existing `YOUTUBE_API_KEY` environment variable to the server, add `env_vars = ["YOUTUBE_API_KEY"]` to its `[mcp_servers.youtube-analytics]` table. See the [Codex MCP guide](https://developers.openai.com/codex/mcp).

## Connect to Gemini CLI

From the directory where you use Gemini CLI, register the server with the absolute path to the compiled file:

```sh
gemini mcp add --scope project --env 'YOUTUBE_API_KEY=$YOUTUBE_API_KEY' youtube-analytics node "/absolute/path/to/youtube-analytics-mcp/build/index.js"
gemini mcp list
```

Open Gemini CLI, trust the project folder if prompted, and run `/mcp` to verify the tools. The Gemini web app uses a reachable MCP server URL for custom connected apps. See the [Gemini CLI MCP guide](https://geminicli.com/docs/tools/mcp-server/) and the [Gemini Apps guide](https://support.google.com/gemini/answer/17209137).

## Connect to Claude Desktop

Add this entry to your `claude_desktop_config.json`. Replace the path with the absolute path to the compiled file. Forward slashes also work on Windows.

```json
{
  "mcpServers": {
    "youtube-analytics": {
      "command": "node",
      "args": ["/absolute/path/to/youtube-analytics-mcp/build/index.js"],
      "env": {
        "YOUTUBE_API_KEY": "YOUR_YOUTUBE_DATA_API_V3_KEY"
      }
    }
  }
}
```

Restart Claude Desktop after saving the config. You can omit the `env` block when using caption tools only. For metadata and comments, enable YouTube Data API v3 in Google Cloud and set `YOUTUBE_API_KEY` in your MCP client's configuration.

Caption retrieval depends on the video's available subtitles and the upstream YouTube transcript service. The hook tool selects caption segments that start before the requested cutoff.

## Example Prompts

- *"Analyze the first 10 seconds hook of this Short and explain why it holds attention: https://youtube.com/shorts/..."*
- *"Fetch the top 20 comments from this video and list the top 5 questions viewers are asking."*
- *"Get the metadata and tags of this video and suggest a higher-CTR title."*

## License

MIT
