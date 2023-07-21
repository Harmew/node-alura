import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://harmew:123@cluster.n5mwgyz.mongodb.net/alura-node"
);

const db = mongoose.connection;
export default db;
