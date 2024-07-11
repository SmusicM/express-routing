const express = require("express")
const app = express();
const itemsRoutes = require("./routes")
const ExpressError = require("./expressError")

app.use(express.json());
//defines item route so we can use router.method for /items
app.use("/items", itemsRoutes);

//handles 404

app.use(function (req, res, next) {
  return new ExpressError("Not Found", 404);
});

//handles error with json error response

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});

module.exports = app;