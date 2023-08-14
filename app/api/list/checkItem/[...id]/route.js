import List from "@models/list";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const list = await List.findById({ _id: params.id[0] });
    let newItemList = [];
    if (params.id[1] === "ALL") {
      newItemList = list.items.map((element) => {
        element.done = false;
        return element;
      });
      list.items = newItemList;
    } else {
      newItemList = list.items.map((element) => {
        if (element._id.toString() == params.id[1]) {
          element.done = !element.done;
        }
        return element;
      });
      list.items = newItemList;
    }
    list.save();
    return new Response("Updated", { status: 200 });
  } catch (error) {
    return new Response("Failed to update the List", {
      status: 500,
    });
  }
};
