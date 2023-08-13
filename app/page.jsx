"use client";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from "next/link";
import ListMin from "@components/ListMin";

const page = () => {
  const { data: session } = useSession();
  const [list, setList] = useState();
  const fetchLists = () => {
    fetch(`/api/list/user/${session.user.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    session?.user && fetchLists();
  }, [session?.user.id]);

  return (
    <section>
      {session?.user ? (
        <>
          {list?.map((item) => {
            return (
              <Link
                href={`/list/${item._id}`}
                key={item._id}
              >
                <ListMin
                  list={item}
                  fetchLists={fetchLists}
                />
              </Link>
            );
          })}
          {/* <List list={{ title: "Title", items: ["item1", "item2"], _id: 1 }} /> */}

          <Link
            href="/create-list"
            className="black_btn"
          >
            Create A Shopping List
          </Link>
        </>
      ) : (
        <h1>Login first</h1>
      )}
    </section>
  );
};

export default page;
