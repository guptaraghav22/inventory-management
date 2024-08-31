const { MongoClient } = require("mongodb");

const connectDB = async () => {
  try {
    const client = new MongoClient(
      "mongodb+srv://demoUser:3nFCaGYLkry17NDG@cluster0.z2rwq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0PORT=2000",
      {
        // useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 60000,
        socketTimeoutMS: 60000,
      }
    );
    await client.connect();

    return client;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
