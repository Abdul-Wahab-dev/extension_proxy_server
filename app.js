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
  proxy("https://flexisaves.toolefy.com", {
    proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
      console.log(proxyReqOpts.headers, "proxy headers");
      console.log(srcReq.headers, "origin headers");

      proxyReqOpts.headers["origin"] = "https://proxy.toolefy.com";
      return proxyReqOpts;
    },
    proxyReqPathResolver: function (req) {
      return req.originalUrl;
    },
  })
);

app.listen(3001, () => {
  console.log("Proxy server running on port 3001");
});
