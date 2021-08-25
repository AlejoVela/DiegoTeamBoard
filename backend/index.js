const express = require("express");
const cors = require("cors");
const { dbConnection } = require('./db/db');
require("dotenv").config();
//routes
const User = require('./routes/user');
const Role = require('./routes/role');
const Board = require('./routes/board');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/user', User);
app.use('/api/role', Role);
app.use('/api/board', Board);
app.use("/uploads", express.static("uploads"));

app.listen(
  process.env.PORT,
  console.log(`Server is listen OK on port ${process.env.PORT}`)
);

dbConnection();