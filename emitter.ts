import { Emitter } from "@socket.io/mongo-emitter";
import { MongoClient } from "mongodb";
import { Server } from "socket.io";

const mongoClient = new MongoClient(
  "mongoConnectionString"
);

const main = async () => {
  const io = new Server();

  try {
    await mongoClient.connect();
  } catch (e: any) {
    console.log(e);
  }
  const mongoCollection = mongoClient
    .db("mydb")
    .collection("socket.io-adapter-events");
  console.log("____");

  const emitter = new Emitter(mongoCollection);
  console.log(emitter);
  console.log("sending");
  setInterval(() => {
    console.log("event");
    emitter.emit("ping", new Date());
    emitter
      .to("room1")
      .except("room2")
      .emit("ping", { createdAt: new Date() });
  }, 1000);
};

main();
