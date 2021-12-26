const express = require("express");
const dbConnect = require("./config/connectDB");
const routes = require("./routes/routes");
const cors = require("cors");
const http = require("http");

const app = express();

dbConnect();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.get("/", (req, res) => {
  res.send("Success!");
});

app.use("/api", routes);

const server = http.createServer(app);
const port = process.env.PORT || 6060;

server.listen(port, () => {
  console.log(`server on going at ${port}`);
});
