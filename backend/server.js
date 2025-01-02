const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "dev") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

app.get("/api", (req, res) => {
  res.json({ time: Date().toString() });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("server is running on port 8000");
});
