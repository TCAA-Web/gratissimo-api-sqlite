import express from "express";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { userRoutes } from "./routes/userRoutes";
import { jobCategoryRoutes } from "./routes/jobCategoryRoutes";
import { jobListingRoutes } from "./routes/jobListingRoutes";
import { userJobFavoriteRoutes } from "./routes/userJobFavoriteRoutes";
import { articleRoutes } from "./routes/articleRoutes";
import { newsletterSubscriberRoutes } from "./routes/newsletterSubscriberRoutes";
import { workTypeRoutes } from "./routes/workTypeRoutes";
import { authRoutes } from "./routes/authRoutes";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { regionRoutes } from "./routes/regionRoutes";
import { testimonyRoutes } from "./routes/testimonyRoutes";

// Load environment variables from .env file
dotenv.config();

// Set up adapter for better-sqlite3
const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
});

// Initialize Prisma Client
export const prisma = new PrismaClient({
  adapter,
});

// Set up Express server
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up static file serving for images
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Routes
app.use("/api", userRoutes);
app.use("/api", jobCategoryRoutes);
app.use("/api", jobListingRoutes);
app.use("/api", userJobFavoriteRoutes);
app.use("/api", articleRoutes);
app.use("/api", newsletterSubscriberRoutes);
app.use("/api", authRoutes);
app.use("/api", workTypeRoutes);
app.use("/api", regionRoutes);
app.use("/api", testimonyRoutes);

// Handle all errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  const statusCode = (err as any).statusCode ?? 500;
  res
    .status(statusCode)
    .json({ error: err.message || "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Add Region - workHome - workType

// Regions: Nordjylland, Midtjylland, Sønderjylland, Fyn, Sjælland, Bornholm
// workHome: Hjemmearbejde, On-site, Delvist
// workType: Fuldtid, Deltid, Flex
