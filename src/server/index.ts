import express from "express";
import { join } from "path";
import { existsSync } from "fs";

const app = express();

const sendFile_config = {
  root: process.cwd(),
};

const getPath = (uri: string): string => {
  if (/\.js|\.map$/.test(uri)) {
    return uri;
  }
  {
    const path = `${uri}.js`;
    if(existsSync(path)) {
      return path;
    }
  }
  {
    const path = join(uri, "index.js");
    if(existsSync(path)) {
      return path;
    }
  }

  throw Error(`Unable to get file ${uri}`);
}

app.get("/css/*", (req, res) => {
  console.log(req.path)
  res.sendFile(req.path, sendFile_config);
});

app.get(/((^\/)|(index(\.html)?))$/, (_, res) => {
  console.log("sending index");
  res.set("Content-Type", "text/html");
  res.sendFile("/html/index.html", sendFile_config);
});

app.get("*", (req, res) => {
  res.set("Context-Type", "text/javascript");
  console.log(req.path);
  const path = getPath(join("dist", "script", req.path));

  res.sendFile(path, sendFile_config);
});

app.listen(80, () => {
  console.log("Listening on 80");
});