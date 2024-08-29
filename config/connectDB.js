const { MongoClient } = require("mongodb");

const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();

    return client;
  } catch (err) {
    process.exit(1);
  }
};

module.exports = connectDB;
