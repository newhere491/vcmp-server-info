// requires
const express = require("express");
const Gamedig = require("gamedig");

// constants
const Port = process.env.PORT || 5000;
const app = express();

// connection with port
app.listen(Port, "0.0.0.0", () => {
  console.log(`Started VCMP activity monitor on the port ${Port}.`);
});

app.use(async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/:host/:port", async (req, res) => {
  var host = req.params.host;
  var port = req.params.port;
  await Gamedig.query({
    type: "vcmp",
    host,
    port,
  })
    .then((state) => {
      return res.json({ msg: `success`, state });
    })
    .catch((error) => {
      res.json({ msg: `error`, error: `:${error}` });
    });
});

app.get("*", async (req, res) => {
  return res.json({ msg: `error`, error: `wrong link` });
});
