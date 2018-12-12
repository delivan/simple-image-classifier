import express from "express";
import path from "path";
import http from "http";

const port = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.end(
    JSON.stringify({
      platform: process.platform,
      nodeVersion: process.version,
      uptime: Math.round(process.uptime())
    })
  );
});

app.listen(port, () => console.log(`listening on port ${port}`));
