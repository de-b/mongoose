const mongoose = require("mongoose");
const dbName = "product";
const uri = "mongodb://localhost:27017/";
const conxnURL = uri + dbName;
mongoose
  .connect(conxnURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("db Connected."))
  .catch((error) => console.log(`Error connecting to MongoDB ${error}`));
