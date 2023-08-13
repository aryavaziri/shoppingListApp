import { Schema, model, models } from "mongoose";

const listSchema = new Schema({
  title: String,
  items: [{ name: String }],
  collaborators: [{ type: Schema.Types.ObjectId, ref: "User" }],
  creator: { type: Schema.Types.ObjectId, ref: "User" },
});

listSchema.methods.additem = function (item) {
  // const updatedList = [...this.card.items];
  // const cardProductIndex = this.card.items.findIndex((cp) => {
  //   return cp.productId.toString() === product._id.toString();
  // });
  // let newQuantity = 1;
  // const updatedCardItems = [...this.card.items];
  // if (cardProductIndex >= 0) {
  //   newQuantity = this.card.items[cardProductIndex].quantity + 1;
  //   updatedCardItems[cardProductIndex].quantity = newQuantity;
  // } else {
  //   updatedCardItems.push({
  //     productId: product._id,
  //     quantity: newQuantity,
  //   });
  // }
  // const updatedCard = { items: updatedCardItems };
  // this.card = updatedCard;
  return this.save();
};
const List = models.List || model("List", listSchema);
export default List;
