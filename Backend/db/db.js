const mongoose = require("mongoose");

const db = async () => {
  try {
    const options = {
      dbName: "Ledger",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL, options);
    console.log("Db Connected");
  } catch (error) {
    console.error("DB Connection Error:", error);
  }
};
module.exports = { db };
