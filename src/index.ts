import express, { Request, Response } from "express";
import { request } from "http";
import path from "path";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const server = express();
server.use(express.json());
server.get("/", (request: Request, response: Response) => {
  return response.sendFile(path.join(__dirname, "..", "src", "public", "index.html"));
});
server.use("/static", express.static(path.join(__dirname, "..", "src", "public")));
server.get("/stream", async (request: Request, response: Response) => {
  try {
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.setHeader("Transfer-Encoding", "chunked");
    response.write(JSON.stringify({ message: "Starting stream..." }));
    for (let i = 0; i < 10; i++) {
      await sleep(1000);
      response.write(JSON.stringify({ i }));
    }
    response.end();
  } catch (error){
    console.error(error);
    return response.status(500).send(`Error: ${(error as Error).message}`);
  }
});

server.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});