import Loader from "../../components/Loader";
import { useGetAllBooksQuery } from "../../redux/hooks/api/apiSlice";

const AllBooks = () => {
  const { data: allBooks, isLoading } = useGetAllBooksQuery(undefined);
  if (isLoading) {
    return <Loader></Loader>;
  }
  console.log(allBooks);
  return (
    <div>
      <h2>All Books</h2>
    </div>
  );
};

export default AllBooks;
