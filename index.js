const stones = require("./routes/stones");
const metals = require("./routes/metals");
const pieces = require("./routes/pieces");
const jewels = require("./routes/jewels");
const types = require("./routes/types");
const users = require("./routes/users");
const auth = require("./routes/auth");
const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost:27017/project-ge", {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use("/api/stones", stones);
app.use("/api/metals", metals);
app.use("/api/pieces", pieces);
app.use("/api/jewels", jewels);
app.use("/api/types", types);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
