import List from "@models/list";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const list = await List.findById(params.listId).populate("creator");
    return new Response(JSON.stringify(list), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch list", { status: 500 });
  }
};
