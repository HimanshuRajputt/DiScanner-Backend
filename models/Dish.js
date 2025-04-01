import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    calories: { type: Number, required: true },
  },
  { _id: false }
); // Disable _id for items

const dishSchema = new mongoose.Schema({
  dishName: { type: String, required: true },
  items: [itemSchema], // Array of items without an _id field
});


export default mongoose.model("Dish", dishSchema);
