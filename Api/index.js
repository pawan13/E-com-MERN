const { error } = require("console");
const express = require("express");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 3000;

//Baasic Middleware

// app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "server is live",
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is running at http://localhost:${PORT}`);
});
