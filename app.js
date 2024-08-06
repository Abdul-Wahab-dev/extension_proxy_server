const express = require("express");
const cors = require("cors");

const proxy = require("express-http-proxy");
const app = express();

// Allow any origin
const corsOptions = {
  origin: "*",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/",
  (req, res, next) => {
    console.log(req.headers);
    next();
  },
  proxy("http://flexisaves.toolefy.com")
);

app.listen(3001, () => {
  console.log("Proxy server running on port 3001");
});
