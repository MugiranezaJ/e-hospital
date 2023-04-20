import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4200;

dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", routes);

// catch all 404 errors
app.all("*", (req, res, next) => {
  res.status(404).json({ message: "Page Requested not found", status: 404 });
});

// catch all remaining errors
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({ status: statusCode, error: err.message });
  next(err);
});

app.listen(PORT, () => {
  console.log("server up and running " + PORT);
});
