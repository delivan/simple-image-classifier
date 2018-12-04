import express from "express";
import path from "path";

const port = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/index.html'));
});

app.listen(port, () => console.log(`listening on port ${port}`));
