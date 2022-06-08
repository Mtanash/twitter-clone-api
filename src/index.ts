import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import connectToDatabase from "./database";

app.listen(process.env.PORT, async () => {
  await connectToDatabase();
  console.log(`Server listening on ${process.env.PORT}`);
});
