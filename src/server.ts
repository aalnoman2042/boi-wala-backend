// src/server.ts
import dotenv from "dotenv";
dotenv.config(); // ✅ Load env vars at the very top

import app from "./app";
import connectToDB from "./db";

const port = process.env.PORT || 5000;

const startingServer = async () => {
  await connectToDB();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startingServer();
