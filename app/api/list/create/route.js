import List from "@models/list";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { userId, title } = await request.json();
  try {
    await connectToDB();
    const newList = new List({ creator: userId, title });
    await newList.save();
    return new Response(JSON.stringify(newList), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new List", { status: 500 });
  }
};
