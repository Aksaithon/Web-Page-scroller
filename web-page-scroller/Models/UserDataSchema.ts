import mongoose from "mongoose";
import Page from "./PageDataSchema";

const UserDataSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: false,
      unique: true,
    },

    texts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Page"
    }]
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.models.Users || mongoose.model("Users", UserDataSchema);

export default Users;
