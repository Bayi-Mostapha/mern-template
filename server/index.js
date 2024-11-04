import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5555;

// // Middleware
app.use(cors());
app.use(express.json());

// // MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use('/api/auth/', authRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
