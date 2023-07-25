import mongoose from "mongoose";

mongoose.connect(process.env.CONNECTION);

const db = mongoose.connection;
export default db;
