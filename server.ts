import dgram from "dgram";
import { faker } from "@faker-js/faker";
import { SERVER_PORT } from "./constant";

export const createServer = () => {
  const server = dgram.createSocket("udp4");

  server.on("error", (err) => {
    console.log(`Server error:\n${err.stack}`);
    server.close();
  });

  server.on("message", (msg, rinfo) => {
    console.log(`Client: ${msg}`);
    const response = faker.lorem.sentence(); // response random fake senetence

    server.send(response, rinfo.port, rinfo.address, (err) => {
      if (err) {
        console.error("Failed to send response:", err);
      }
    });
  });

  server.bind(SERVER_PORT);
};
