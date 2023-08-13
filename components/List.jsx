"use client";
import { useEffect, useState } from "react";

const List = ({ listId }) => {
  const [list, setList] = useState();
  const [item, setItem] = useState("");

  const addItem = (e) => {
    e.preventDefault();
    fetch(`/api/list/addItem/${listId}`, {
      method: "POST",
      body: JSON.stringify({
        item: item,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("OK");
          setItem("");
          fetchList();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchList = () => {
    fetch(`/api/list/${listId}`)
      .then((response) => {
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
    fetchList();
  }, []);
  return (
    <section className="shadow hover:shadow-lg duration-300 rounded p-2 m-2">
      <h1 className="text-2xl my-2 text-center">{list?.title.toUpperCase()}</h1>

      {list?.items.length ? (
        <ul className="py-2">
          {list.items.map((item) => {
            return (
              <li
                className="text-sm"
                key={item._id}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      ) : (
        <div>No items in the list</div>
      )}
      <form onSubmit={addItem}>
        <input
          placeholder="New Item"
          type="text"
          name="item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <button type="submit">Add item</button>
      </form>
    </section>
  );
};

export default List;
