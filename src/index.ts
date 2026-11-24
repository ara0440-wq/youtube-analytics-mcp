#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { YoutubeTranscript } from "youtube-transcript";
import { z } from "zod";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// Extracts the 11-character YouTube video ID from standard, Shorts, live, embed, or youtu.be URLs
function extractVideoId(input: string): string {
  const inputValue = input.trim();
  const idPattern = /^[a-zA-Z0-9_-]{11}$/;
  if (idPattern.test(inputValue)) return inputValue;

  const url = new URL(
    inputValue.includes("://") ? inputValue : `https://${inputValue}`
  );
  const [, route, pathId] = url.pathname.split("/");
  let id: string | null | undefined;
  if (url.hostname === "youtu.be") {
    id = route;
  } else if (url.hostname === "youtube.com" || url.hostname.endsWith(".youtube.com")) {
    if (route === "watch") id = url.searchParams.get("v");
    if (["shorts", "embed", "live"].includes(route)) id = pathId;
  }
  if ((url.protocol === "https:" || url.protocol === "http:") && id && idPattern.test(id)) {
    return id;
  }
  throw new Error("Enter a YouTube video URL or an 11-character video ID.");
}

async function fetchOpeningCaptions(videoId: string, seconds: number): Promise<string> {
  let offsetScale = 1;
  const transcript = await YoutubeTranscript.fetchTranscript(videoId, {
    fetch: async (input, init) => {
      const response = await fetch(input, { ...init, signal: AbortSignal.timeout(15_000) });
      if (response.ok && new URL(String(input)).pathname === "/api/timedtext") {
        // youtube-transcript returns milliseconds for srv3 and seconds for classic XML.
        const xml = await response.clone().text();
        offsetScale = /<p\s+t="\d+"\s+d="\d+"/.test(xml) ? 1 : 1000;
      }
      return response;
    },
  });
  return transcript
    .filter((segment) => segment.offset * offsetScale < seconds * 1000)
    .map((segment) => segment.text)
    .join(" ");
}

const server = new McpServer({
  name: "youtube-analytics-mcp",
  version: "1.0.0",
});

// Tool 1: Full video or Shorts transcript (No API key needed)
server.tool(
  "get_video_transcript",
  "Fetch the full transcript text of a YouTube video or Short.",
  {
    url: z.string().describe("YouTube video/Shorts URL or 11-character video ID"),
  },
  async ({ url }) => {
    try {
      const videoId = extractVideoId(url);
      const transcript = await YoutubeTranscript.fetchTranscript(videoId, {
        fetch: (input, init) => fetch(input, { ...init, signal: AbortSignal.timeout(15_000) }),
      });
      const fullText = transcript.map((t) => t.text).join(" ");
      return {
        content: [{ type: "text", text: fullText || "No transcript found." }],
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Error fetching transcript: ${error.message}` }],
        isError: true,
      };
    }
  }
);

// Tool 2: Opening hook extractor for Shorts & retention analysis (No API key needed)
server.tool(
  "get_shorts_hook",
  "Extract the opening seconds (hook) of a YouTube video or Short for retention analysis.",
  {
    url: z.string().describe("YouTube video/Shorts URL or video ID"),
    seconds: z
      .number()
      .positive()
      .optional()
      .default(10)
      .describe("Number of opening seconds to extract (default: 10)"),
  },
  async ({ url, seconds }) => {
    try {
      const videoId = extractVideoId(url);
      const hookText = await fetchOpeningCaptions(videoId, seconds);

      return {
        content: [
          {
            type: "text",
            text: `Opening ${seconds}s Hook:\n${hookText || "No spoken text found in the opening seconds."}`,
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Error extracting hook: ${error.message}` }],
        isError: true,
      };
    }
  }
);

// Tool 3: Video metadata, stats, and tags (Requires YOUTUBE_API_KEY)
server.tool(
  "get_video_metadata",
  "Fetch title, description, tags, views, likes, and comment count via YouTube Data API v3.",
  {
    url: z.string().describe("YouTube video/Shorts URL or video ID"),
  },
  async ({ url }) => {
    if (!YOUTUBE_API_KEY) {
      return {
        content: [
          {
            type: "text",
            text: "YOUTUBE_API_KEY environment variable is not set.",
          },
        ],
        isError: true,
      };
    }

    try {
      const videoId = extractVideoId(url);
      const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${encodeURIComponent(YOUTUBE_API_KEY)}`;
      const res = await fetch(apiUrl, { signal: AbortSignal.timeout(15_000) });
      if (!res.ok) throw new Error(`YouTube Data API returned HTTP ${res.status}.`);
      const data: any = await res.json();

      if (!data.items || data.items.length === 0) {
        return {
          content: [{ type: "text", text: "Video not found." }],
          isError: true,
        };
      }

      const item = data.items[0];
      const result = {
        videoId,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        views: item.statistics.viewCount,
        likes: item.statistics.likeCount,
        comments: item.statistics.commentCount,
        tags: item.snippet.tags || [],
        description: item.snippet.description,
      };

      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Error fetching metadata: ${error.message}` }],
        isError: true,
      };
    }
  }
);

// Tool 4: Top comments for audience sentiment & content ideas (Requires YOUTUBE_API_KEY)
server.tool(
  "get_top_comments",
  "Fetch the top comments of a YouTube video for audience sentiment analysis.",
  {
    url: z.string().describe("YouTube video/Shorts URL or video ID"),
    limit: z
      .number()
      .int()
      .min(1)
      .optional()
      .default(15)
      .describe("Number of top comments to fetch (max 50)"),
  },
  async ({ url, limit }) => {
    if (!YOUTUBE_API_KEY) {
      return {
        content: [
          {
            type: "text",
            text: "YOUTUBE_API_KEY environment variable is not set.",
          },
        ],
        isError: true,
      };
    }

    try {
      const videoId = extractVideoId(url);
      const maxResults = Math.min(limit, 50);
      const apiUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&order=relevance&textFormat=plainText&maxResults=${maxResults}&key=${encodeURIComponent(YOUTUBE_API_KEY)}`;
      const res = await fetch(apiUrl, { signal: AbortSignal.timeout(15_000) });
      if (!res.ok) throw new Error(`YouTube Data API returned HTTP ${res.status}.`);
      const data: any = await res.json();

      const comments = (data.items || []).map((item: any, idx: number) => {
        const c = item.snippet.topLevelComment.snippet;
        return `${idx + 1}. [${c.likeCount} likes] ${c.authorDisplayName}: ${c.textDisplay}`;
      });

      return {
        content: [
          {
            type: "text",
            text: comments.join("\n\n") || "No comments found.",
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Error fetching comments: ${error.message}` }],
        isError: true,
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
