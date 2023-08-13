import List from "@models/list";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    await List.deleteOne({ _id: params.listId });
    return new Response("Deleted", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete the List", { status: 500 });
  }
};
