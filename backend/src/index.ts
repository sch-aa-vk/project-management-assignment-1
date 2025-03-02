import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import swaggerUI from "swagger-ui-express";
import authRoutes from "./routes/authRoutes";
import accountRoutes from "./routes/accountRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import swaggerOptions from "./config/swaggerOptions";
import { loggingMiddleware } from "./middleware/loggingMiddleware";
import { authMiddleware } from "./middleware/authMiddleware";
import { errorMiddleware } from "./middleware/errorMiddleware";
import swaggerJSDoc from "swagger-jsdoc";
import cors from "cors";
import corsOptions from "./config/corsOptions";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const specs = swaggerJSDoc(swaggerOptions);

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors(corsOptions));

app.use(loggingMiddleware);

app.use(
  "/api/docs",
  swaggerUI.serve,
  swaggerUI.setup(specs, { explorer: true })
);
app.use("/api/auth", authRoutes);
app.use("/api/account", authMiddleware, accountRoutes);
app.use("/api/transaction", authMiddleware, transactionRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
