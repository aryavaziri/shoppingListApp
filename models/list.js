import { Schema, model, models } from "mongoose";

const listSchema = new Schema({
  title: String,
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  collaborators: [{ type: Schema.Types.ObjectId, ref: "User" }],
  creator: { type: Schema.Types.ObjectId, ref: "User" },
});
const List = models.List || model("List", listSchema);
export default List;
