const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const dbPathUrl =
      "mongodb://kinanta99:kinanta99@cluster0-shard-00-00.ftgit.mongodb.net:27017,cluster0-shard-00-01.ftgit.mongodb.net:27017,cluster0-shard-00-02.ftgit.mongodb.net:27017/assignment3?ssl=true&replicaSet=atlas-xkxosx-shard-0&authSource=admin&retryWrites=true&w=majority";
    await mongoose.connect(`${dbPathUrl}`);
    console.log("DB Connect");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnect;
