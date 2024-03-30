require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const path = require("path");
const { logger, logEvents } = require("./src/api/middleware/logger");
const errorHandler = require("./src/api/middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./src/config/corsOptions");
const connectDB = require("./src/config/dbConnection");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3500;

console.log(process.env.NODE_ENV);

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

// to serve static files
// app.use("/", express.static(path.join(__dirname, "public")));

// app.use("/", require("./routes/root"));
app.use("/auth", require("./src/api/auth/authRoutes"));
app.use("/users", require("./src/api/users/userRoutes"));
app.use("/faculties", require("./src/api/faculty/facultyRoutes"));
app.use("/students", require("./src/api/students/studentRoutes"));
app.use("/staff", require("./src/api/staff/staffRoutes"));
app.use("/courses", require("./src/api/courses/courseRoutes"));
app.use("/enrolments", require("./src/api/enrolments/enrolmentsRoutes"));
app.use("/halls", require("./src/api/halls/hallRoutes"));
app.use("/allocations", require("./src/api/hallAllocations/hallAllocationRoutes"));
app.use("/schedule", require("./src/api/schedule/scheduleRoutes"));

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
