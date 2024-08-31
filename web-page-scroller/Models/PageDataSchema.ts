import mongoose from "mongoose";

const PageDataSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Page = mongoose.models.Page || mongoose.model("Page", PageDataSchema);

export default Page;
