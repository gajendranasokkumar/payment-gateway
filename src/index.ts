import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();

const app: Application = express();
app.use(express.json());

const corsOptions: CorsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));

const dbURI: string | undefined = process.env.NODE_ENV === "local" 
  ? process.env.MONGODB_URI_LOCAL 
  : process.env.MONGODB_URI_PRODUCTION;

let isConnected = false;

const connectToDatabase = async (): Promise<void> => {
  if (!isConnected && dbURI) {
    try {
      await mongoose.connect(dbURI, { maxPoolSize: 50 });
      isConnected = true;
      console.log("🌿 MongoDB connected with pooling");
    } catch (err) {
      console.error("MongoDB connection error:", err);
    }
  }
};

if (!isConnected) connectToDatabase();

app.use("/", router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;
app.listen(PORT, () => {
  console.log(`🖥️  Server is running on port ${PORT}`);
});