const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const bookRoutes = require("./controllers/bookController");

const app = express();

connectDB();

const corsOption = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOption));
app.use(express.json());

app.use("/api/books", bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started listeing on http://localhost:${PORT}`);
});
