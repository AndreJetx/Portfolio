import { createApp, log } from "./app";
import { createServer } from "http";

(async () => {
  const serveStatic = process.env.NODE_ENV === "production" && !process.env.VERCEL;
  const app = await createApp({ serveStatic });

  const httpServer = createServer(app);

  if (process.env.NODE_ENV !== "production") {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  const port = parseInt(process.env.PORT || "5000", 10);
  const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost";
  httpServer.listen({ port, host }, () => {
    log(`serving on http://${host}:${port}`);
  });
})();
