import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL || "");
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log(
        "Mongoose default connection open to " + connection.db.databaseName
      );
    });
    connection.on("error", (err) => {
      console.log("Mongoose default connection error: " + err);
      process.exit();
    });
  } catch (err) {
    console.log("Something went wrong");
    console.log(err);
  }
};
