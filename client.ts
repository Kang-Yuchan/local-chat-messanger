import dgram from "dgram";
import { SERVER_ADDRESS, SERVER_PORT } from "./constant";
import readline from "readline";

export const createClient = () => {
  const client = dgram.createSocket("udp4");

  client.on("message", (msg) => {
    console.log(msg);
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", (msg) => {
    if (msg.toLocaleLowerCase() === "exit") {
      rl.close();
      client.close();
    } else {
      sendMessage(client, msg);
    }
  });

  rl.on("close", () => {
    console.log("Local chat ended");
    process.exit(0);
  });
};

const sendMessage = (client: dgram.Socket, message: string) => {
  client.send(message, SERVER_PORT, SERVER_ADDRESS, (err) => {
    if (err) {
      console.error("Failed to send message:", err);
    } else {
      console.log(`Client sent: ${message}`);
    }
  });
};
