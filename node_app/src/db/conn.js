const { MongoClient } = require("mongodb");

//const ATLAS_URI= 'mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
//const ATLAS_URI = "mongodb+srv://root:root123@database_mongo/aula?retryWrites=true&w=majority";
const ATLAS_URI =
  "mongodb://database_mongo:27017/escola?retryWrites=true&w=majority";
//const connectionString = process.env.ATLAS_URI;
const connectionString = ATLAS_URI;

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("projeto");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};
