// Vercel serverless handler. vercel.json rewrites send /api and /api/* here.
// Path segments become query params; we restore req.url so Express routes match.
const { createApp } = require("../dist/app.cjs");

let appPromise = null;

function getApp() {
  if (!appPromise) {
    appPromise = createApp({ serveStatic: false });
  }
  return appPromise;
}

module.exports = async (req, res) => {
  // Rewrite sends /api/:path* to /api with path in query; restore original URL
  const path = req.query.path;
  if (path !== undefined) {
    const segment = Array.isArray(path) ? path.join("/") : path;
    req.url = segment ? `/api/${segment}` : "/api";
  }
  const app = await getApp();
  app(req, res);
};
