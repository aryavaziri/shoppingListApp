import { Schema, model, models } from "mongoose";

const itemSchema = new Schema({
  name: String,
  done: { type: Boolean, default: false },
  quantity: { type: Number, default: 1 },
  source: { type: String },
  priority: { type: String },
});
const Item = models.Item || model("Item", itemSchema);
export default Item;
