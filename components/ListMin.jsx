import { AiOutlineDelete } from "react-icons/ai";

const ListMin = ({ list, fetchLists }) => {
  const delHandler = (e) => {
    e.preventDefault();
    console.log(list._id);
    fetch(`/api/list/delete/${list._id}/`)
      .then((response) => {
        if (response.ok) {
          console.log("OK");
          fetchLists();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section className="shadow hover:shadow-lg list-item2 duration-300 rounded p-2 m-2 relative">
      <h1 className="text-2xl my-2 text-center">{list.title.toUpperCase()}</h1>

      {/* {list.items?.length ? (
        <ul className="py-2">
          {list.items.map((item) => {
            return (
              <li
                className="text-sm"
                key={item}
              >
                {item}
              </li>
            );
          })}
        </ul>
      ) : (
        <div>No items in the list</div>
      )} */}
      <div className="sm:hidden absolute right-1 bottom-1 item-buttons">
        <button
          onClick={delHandler}
          className="rounded-full bg-slate-400 hover:bg-rose-400 duration-300 w-fit p-1 ml-1"
        >
          <AiOutlineDelete />
        </button>
      </div>
    </section>
  );
};

export default ListMin;
