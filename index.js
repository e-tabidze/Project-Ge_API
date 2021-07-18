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
const CronJob = require("cron").CronJob;
const { Jewel } = require("./models/jewel");
const passwordReset = require("./routes/passwordReset");

require('dotenv').config();

// const expChecker = async () => {
//   const jewelsArray = await Jewel.find();
//   let jewelsArrayFiltered = jewelsArray.filter((item) => {
//     return item.type.name === "Super" || "VIP";
//   });
//   let dateNow = Date.now();
//   let newDateNow = new Date(dateNow);
//   jewelsArray.forEach(async (item) => {
//     if (
//       item.expirationDate.getDate() === newDateNow.getDate() &&
//       item.expirationDate.getMonth() === newDateNow.getMonth() &&
//       item.expirationDate.getYear() === newDateNow.getYear() &&
//       !item.expired
//     ) {
//       await Jewel.findByIdAndUpdate(item.id, { expired: true });
//     }
//   });
// };

// const subscribtionJob = new CronJob(
//   "* * * * * *",
//   expChecker,
//   null,
//   false,
//   "America/Los_Angeles"
// );

// subscribtionJob.start();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect(process.env.DB, {
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
app.use("/api/password-reset", passwordReset)
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
