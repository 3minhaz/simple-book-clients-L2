import { useParams } from "react-router-dom";
import { useGetSingleBooksQuery } from "../../redux/hooks/api/apiSlice";
import Loader from "../../components/Loader";
import { useAppSelector } from "../../redux/hooks/useReduxHooks";

const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBooksQuery(id);
  const user = useAppSelector((state) => state.users);
  if (isLoading) {
    return <Loader></Loader>;
  }
  const { image, title, author, genre, publicationDate } = data;

  return (
    <div>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row">
          <img src={image} className="w-96 rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">Title: {title}</h1>
            <h1 className="text-xl mt-4">Author: {author}</h1>
            <h1 className="text-xl mt-4">Genre: {genre}</h1>
            <h1 className="text-xl mt-4">Published Date: {publicationDate}</h1>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
      <div className="mt-12 w-full">
        <form>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-primary w-full mb-4"
          />
          <input className="btn btn-success" type="submit" value="Comment" />
        </form>
      </div>
    </div>
  );
};

export default BookDetails;
