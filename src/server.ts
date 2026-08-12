import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

function addSecurityHeaders(response: Response): Response {
  try {
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=(), interest-cohort=()",
    );
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload",
    );
    response.headers.set(
      "Content-Security-Policy",
      "default-src 'self' https://*.supabase.co https://*.lovable.app https://*.lovable.dev; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.supabase.co https://*.lovable.app https://*.lovable.dev https://challenges.cloudflare.com; " +
        "style-src 'self' 'unsafe-inline' https: http: https://*.lovable.app https://*.lovable.dev; " +
        "font-src 'self' data: https: http: https://*.lovable.app https://*.lovable.dev; " +
        "img-src 'self' data: blob: https: http: https://*.supabase.co https://images.unsplash.com https://*.lovable.app https://*.lovable.dev; " +
        "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.lovable.app https://*.lovable.dev wss://*.lovable.app wss://*.lovable.dev; " +
        "frame-ancestors 'self' https://*.lovable.app https://*.lovable.dev; " +
        "object-src 'none';",
    );
    return response;
  } catch (e) {
    const newHeaders = new Headers(response.headers);
    newHeaders.set("X-Content-Type-Options", "nosniff");
    newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
    newHeaders.set(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=(), interest-cohort=()",
    );
    newHeaders.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    newHeaders.set(
      "Content-Security-Policy",
      "default-src 'self' https://*.supabase.co https://*.lovable.app https://*.lovable.dev; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.supabase.co https://*.lovable.app https://*.lovable.dev https://challenges.cloudflare.com; " +
        "style-src 'self' 'unsafe-inline' https: http: https://*.lovable.app https://*.lovable.dev; " +
        "font-src 'self' data: https: http: https://*.lovable.app https://*.lovable.dev; " +
        "img-src 'self' data: blob: https: http: https://*.supabase.co https://images.unsplash.com https://*.lovable.app https://*.lovable.dev; " +
        "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.lovable.app https://*.lovable.dev wss://*.lovable.app wss://*.lovable.dev; " +
        "frame-ancestors 'self' https://*.lovable.app https://*.lovable.dev; " +
        "object-src 'none';",
    );
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      return addSecurityHeaders(normalized);
    } catch (error) {
      console.error(error);
      const errResponse = new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
      return addSecurityHeaders(errResponse);
    }
  },
};
