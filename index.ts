import { createServer } from "./server";
import { createClient } from "./client";

const args = process.argv.slice(2);
if (args[0] === "server") {
  createServer();
} else if (args[0] === "client") {
  createClient();
} else {
  console.log('Please specify "server" or "client" as an argument');
}
