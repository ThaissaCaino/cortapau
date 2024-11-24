const mongoose = require("mongoose");

async function main() {
  const ATLAS_URI =
    "mongodb://database_mongo:27017/projeto?retryWrites=true&w=majority";

  await mongoose.connect(ATLAS_URI);
  console.log("Conectou com Mongoose!");
}

main().catch((err) => console.log(err));

module.exports = mongoose;
