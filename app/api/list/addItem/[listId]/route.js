import List from "@models/list";
import { connectToDB } from "@utils/database";

export const POST = async (request, { params }) => {
  const { item } = await request.json();

  try {
    await connectToDB();
    const list = await List.findById(params.listId).populate("creator");
    console.log(list.items);
    list.items.push({ name: item });
    console.log(list.items);

    // const newItem = new List({ creator: userId, title });
    await list.save();
    return new Response(JSON.stringify(list), { status: 200 });
  } catch (error) {
    return new Response("Failed to add a new item to the List", {
      status: 500,
    });
  }
};
