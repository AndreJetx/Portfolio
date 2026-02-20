import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

export type CreateAppOptions = {
  /** Serve built client from dist/public (set false on Vercel; static is served by platform) */
  serveStatic?: boolean;
};

/**
 * Creates the Express app. Used by the local server (index.ts) and by the Vercel serverless handler (api/index.ts).
 */
export async function createApp(options: CreateAppOptions = {}): Promise<express.Express> {
  const { serveStatic: shouldServeStatic = false } = options;

  const app = express();

  app.use(
    express.json({
      verify: (req: express.Request, _res, buf) => {
        (req as express.Request & { rawBody: unknown }).rawBody = buf;
      },
    }),
  );
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse: Record<string, unknown> | undefined;

    const originalResJson = res.json.bind(res);
    res.json = function (bodyJson, ...args) {
      capturedJsonResponse = bodyJson as Record<string, unknown>;
      return originalResJson(bodyJson, ...args);
    };

    res.on("finish", () => {
      const duration = Date.now() - start;
      if (path.startsWith("/api")) {
        let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
        if (capturedJsonResponse) {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        }
        log(logLine);
      }
    });

    next();
  });

  await registerRoutes(app);

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    const status = (err as { status?: number }).status ?? (err as { statusCode?: number }).statusCode ?? 500;
    const message = (err as Error).message ?? "Internal Server Error";
    console.error("Internal Server Error:", err);
    if (!res.headersSent) {
      res.status(status).json({ message });
    }
  });

  if (shouldServeStatic) {
    serveStatic(app);
  }

  return app;
}
