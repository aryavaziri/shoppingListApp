import List from "@models/list";
import Item from "@models/item";
import { NextResponse } from "next/server";
import { connectToDB } from "@utils/database";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export const GET = async (req, res) => {
  const session = await getServerSession(authOptions);
  await connectToDB();
  switch (res.params?.id?.length) {
    case 1:
      try {
        const list = await List.findById(res.params.id).populate("items");
        return new Response(JSON.stringify(list), { status: 200 });
      } catch (error) {
        console.log(error);
        return new Response("Failed to fetch list", { status: 500 });
      }
      break;
    case 2:
      break;
    default:
      try {
        const lists = await List.find({ creator: session?.user.id });
        return NextResponse.json(lists, { status: 200 });
      } catch (error) {
        console.log(error);
        return new Response("Failed to fetch all lists", { status: 500 });
      }
  }
};
export const POST = async (req, res) => {
  const session = await getServerSession(authOptions);
  const { item, title } = await req.json();
  await connectToDB();
  switch (res.params?.id?.length) {
    case 1:
      try {
        const newItem = new Item({ name: item });
        newItem.save();
        let list = await List.findById(res.params.id[0]).populate("items");
        const temp = list.items.findIndex((item) => {
          return item.name === newItem.name;
        });
        if (temp == -1) {
          list.items.push(newItem);
          await list.save();
        } else {
          const item = await Item.findById(list.items[temp]._id);
          item.done = false;
          await item.save();
          list = await List.findById(res.params.id[0]).populate("items");
        }
        return new Response(JSON.stringify(list), { status: 200 });
      } catch (error) {
        console.log(error);
        return new Response("Failed to add a new item to the List", {
          status: 500,
        });
      }
      break;
    case 2:
      break;
    default:
      try {
        const newList = new List({ creator: session.user.id, title });
        await newList.save();
        return new Response(JSON.stringify(newList), { status: 201 });
      } catch (error) {
        return new Response("Failed to create a new List", { status: 500 });
      }
  }
};

export const DELETE = async (req, res) => {
  const session = await getServerSession(authOptions);
  await connectToDB();
  switch (res.params?.id?.length) {
    case 2:
      let list;
      try {
        if (res.params.id[1] == "ALL") {
          list = await List.findById(res.params.id[0]).populate("items");
          list.items = [];
          list.save();
        } else {
          const item = await Item.findByIdAndDelete(res.params.id[1]);
          list = await List.findById(res.params.id[0]).populate("items");
        }
        return new Response(JSON.stringify(list), { status: 200 });
      } catch (error) {
        console.log(error);
        return new Response("Failed to Delete the item from the list", {
          status: 500,
        });
      }
      break;
    case 1:
      try {
        await List.findByIdAndDelete(res.params?.id[0]);
        const lists = await List.find({ creator: session?.user.id });
        return new Response(JSON.stringify(lists), { status: 201 });
      } catch (error) {
        return new Response("Failed to delete the lsit", { status: 500 });
      }
  }
};

export const PUT = async (request, res) => {
  try {
    await connectToDB();
    const list = await List.findById({ _id: res.params.id[0] }).populate(
      "items"
    );
    let newItemList = [];
    switch (res.params?.id?.length) {
      case 2:
        if (res.params.id[1] === "ALL") {
          newItemList = list.items.map((element) => {
            element.done = false;
            element.save();
            return element;
          });
        } else {
          newItemList = list.items.map((element) => {
            if (element._id.toString() == res.params.id[1]) {
              element.done = !element.done;
              element.save();
            }
            return element;
          });
        }
        break;
      default:
    }
    list.items = newItemList;
    return new Response(JSON.stringify(list), { status: 200 });
  } catch (error) {
    return new Response("Failed to update the List", {
      status: 500,
    });
  }
};
