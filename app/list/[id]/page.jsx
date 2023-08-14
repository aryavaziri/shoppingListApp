import List from "@components/List";
const page = ({ params }) => {
  return (
    <section>
      <List listId={params.id} />
    </section>
  );
};
export default page;
