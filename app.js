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
    // userResDecorator: function (proxyRes, proxyResData, userReq, userRes) {
    //   if (proxyRes.statusCode === 301 || proxyRes.statusCode === 302) {
    //     userRes.status(proxyRes.statusCode).redirect(proxyRes.headers.location);
    //   } else {
    //     return proxyResData;
    //   }
    // },
    userResHeaderDecorator(headers, userReq, userRes, proxyReq, proxyRes) {
      // recieves an Object of headers, returns an Object of headers.
      headers["origin"] = "https://proxy.toolefy.com";
      return headers;
    },
  })
);

app.listen(3001, () => {
  console.log("Proxy server running on port 3001");
});
