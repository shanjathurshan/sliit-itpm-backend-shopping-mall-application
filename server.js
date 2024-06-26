require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const path = require("path");
const { logger, logEvents } = require("./src/api/middleware/logger");
const errorHandler = require("./src/api/middleware/errorHandler");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const cors = require("cors");
const corsOptions = require("./src/config/corsOptions");
const connectDB = require("./src/config/dbConnection");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3500;

console.log(process.env.NODE_ENV);

app.use(express.json())

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

connectDB();

app.use(logger);
// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));
app.use(cookieParser());
// app.use(cors(corsOptions));


// to serve static files
// app.use("/", express.static(path.join(__dirname, "public")));

// app.use("/", require("./routes/root"));
app.use("/auth", require("./src/api/auth/authRoutes"));
app.use("/users", require("./src/api/users/userRoutes"));


app.use("/games", require("./src/api/games/gameRoutes"));


// Access Images from the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
