import { createClient } from "redis";

const redis = createClient();
const createConnection = async () => {
  try {
    await redis.connect();
    console.log("subscriber redis connected");
  } catch (e) {
    console.log(e);
  }
};
const main = async () => {
  createConnection();
  try {
    await redis.subscribe("user1", (message) => {
      console.log("Message : ", message);
    });
  } catch (e) {
    console.log(e);
  }
};

main();
