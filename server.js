import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import productRoutes from "./routes/productRoutes.js";

const app = express();
app.use(express.json());

// MongoDB connection
const user = process.env.DB_USER;
const pass = encodeURIComponent(process.env.DB_PASS);
const cluster = process.env.DB_CLUSTER;
const dbName = process.env.DB_NAME;

const uri = `mongodb+srv://${user}:${pass}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri)
  .then(() => console.log("MongoDB successfully connected!"))
  .catch((err) => console.error(" Error in MongoDB connection:", err));
 
app.use("/products", productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
