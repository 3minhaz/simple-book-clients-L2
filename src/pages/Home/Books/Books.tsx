import { useGetTenBooksQuery } from "../../../redux/hooks/api/apiSlice";
import Loader from "../../../components/Loader";
import { Link } from "react-router-dom";

const Books = () => {
  const { data: books, isLoading } = useGetTenBooksQuery({
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="mt-18 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {books?.length > 0 &&
        books?.map((book: any) => (
          <div key={book._id} className="card shadow-xl">
            <figure className="w-full h-80">
              <img src={book.image} alt="Shoes" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">
                {book.title}
                {/* <div className="badge badge-secondary">NEW</div> */}
              </h2>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre}</p>
              <p>Publication Date: {book.publicationDate}</p>
              <p className="btn btn-primary">
                <Link to={`/books/${book._id}`}>Details</Link>
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Books;
