import List from "@models/list";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const lists = await List.find({ creator: params.userId }).populate(
      "creator"
    );
    return new Response(JSON.stringify(lists), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all lists", { status: 500 });
  }
};
