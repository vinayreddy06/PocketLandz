import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  projectName: String,
  company: String,
  area: String,
  approval: String,
  plotSize: String,
  pricePerSqYd: Number,
  totalPrice: Number,
  distance: String,
  verified: Boolean,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Listing", listingSchema);