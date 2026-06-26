const fs = require("fs");
const http = require("http");
const path = require("path");

const primaryPort = Number.parseInt(process.env.PORT || "3000", 10);
const fallbackPort = 3000;
const hostname = "0.0.0.0";
const publicDir = path.join(__dirname, "out");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

function resolveFilePath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath.split("?")[0] || "/");
  const cleanPath = path.normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  const requestedPath = path.join(publicDir, cleanPath);

  if (!requestedPath.startsWith(publicDir)) {
    return null;
  }
  if (fs.existsSync(requestedPath) && fs.statSync(requestedPath).isFile()) {
    return requestedPath;
  }
  const indexPath = path.join(requestedPath, "index.html");
  if (fs.existsSync(indexPath)) {
    return indexPath;
  }
  const htmlPath = `${requestedPath}.html`;
  if (fs.existsSync(htmlPath)) {
    return htmlPath;
  }
  return path.join(publicDir, "404.html");
}

function createStaticServer() {
  return http.createServer((request, response) => {
    const filePath = resolveFilePath(request.url || "/");
    if (!filePath || !fs.existsSync(filePath)) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    const statusCode = path.basename(filePath) === "404.html" ? 404 : 200;
    response.writeHead(statusCode, {
      "Content-Type": contentTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "Cache-Control": filePath.includes(`${path.sep}_next${path.sep}`)
        ? "public, max-age=31536000, immutable"
        : "public, max-age=300",
    });
    fs.createReadStream(filePath).pipe(response);
  });
}

function listenOnPort(port) {
  createStaticServer().listen(port, hostname, () => {
    console.log(`Static server ready on http://${hostname}:${port}`);
  });
}

listenOnPort(primaryPort);
if (primaryPort !== fallbackPort) {
  listenOnPort(fallbackPort);
}
