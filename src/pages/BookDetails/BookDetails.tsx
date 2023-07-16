import { useParams } from "react-router-dom";
import { useGetSingleBooksQuery } from "../../redux/hooks/api/apiSlice";
import Loader from "../../components/Loader";

const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBooksQuery(id);
  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <h2>This is book details</h2>
    </div>
  );
};

export default BookDetails;
