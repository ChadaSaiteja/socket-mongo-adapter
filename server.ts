import { Server } from "socket.io";
import { createAdapter } from "@socket.io/mongo-adapter";
import { MongoClient } from "mongodb";


const DB = "mydb";
const COLLECTION = "socket.io-adapter-events";

const startServer = async () => {
  const io = new Server();

  const mongoClient = new MongoClient("mongoConnectionString");

  try {
    await mongoClient.connect();
    await mongoClient.db(DB).createCollection(COLLECTION, {
      capped: true,
      size: 1e6
    });
  } catch (e) {
    // Collection already exists
  }

  const mongoCollection = mongoClient.db(DB).collection(COLLECTION);
  console.log(mongoCollection)
  io.adapter(createAdapter(mongoCollection));
  io.listen(3000)

  setInterval(() => {
    console.log("event");
    io.emit("ping", new Date());
    
  }, 1000);
  console.log("Server is running on port 3000");
};

startServer().catch((error) => {
  console.error("Error starting server:", error);
});
