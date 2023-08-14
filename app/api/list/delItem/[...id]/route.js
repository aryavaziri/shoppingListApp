import List from "@models/list";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const list = await List.findById({ _id: params.id[0] });
    let newItemList = [];
    if (params.id[1] === "ALL") {
      list.items = newItemList;
    } else {
      newItemList = list.items.filter((element) => {
        return element._id.toString() != params.id[1];
      });
      list.items = newItemList;
    }
    list.save();
    return new Response("Deleted", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete the Item from the List", {
      status: 500,
    });
  }
};
