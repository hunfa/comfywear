/* This is a database connection function*/
import mongoose from "mongoose";

const connection = {}; /* creating connection object*/

async function dbConnect() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return;
  }

  /* connecting to our database */
  try {
    const db = await mongoose.connect(
      "mongodb+srv://nabeel:nabeel@cluster0.vnr62df.mongodb.net/comfywear",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    connection.isConnected = db.connections[0].readyState;
    console.log("db connected");
  } catch (error) {
    console.log("error while connected", error);
  }
}

export default dbConnect;
