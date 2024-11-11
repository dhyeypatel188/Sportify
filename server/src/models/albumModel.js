import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
  name: { type: String, requied: true },
  desc: { type: String, requied: true },
  bgColor: { type: String, requied: true },
  image: { type: String, requied: true },
});

const albumModel =
  mongoose.models.album || mongoose.model("album", albumSchema);

export default albumModel;
