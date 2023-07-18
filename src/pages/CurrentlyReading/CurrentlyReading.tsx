import { useEffect } from "react";
import Loader from "../../components/Loader";
import {
  useGetReadingListQuery,
  useUpdateReadingStatusMutation,
} from "../../redux/hooks/api/apiSlice";
import { useAppSelector } from "../../redux/hooks/useReduxHooks";
import { toast } from "react-hot-toast";

const CurrentlyReading = () => {
  const email = useAppSelector((state) => state.users.email);
  const { data: readingBooks, isLoading } = useGetReadingListQuery(email, {
    refetchOnMountOrArgChange: true,
  });
  const [changeStatus, { data: bookStatusChange }] =
    useUpdateReadingStatusMutation();

  const handleReadingStatusChange = (data: {
    e: React.ChangeEvent<HTMLSelectElement>;
    id: string;
  }) => {
    const updateData = {
      email: email,
      status: data.e.target.value,
      id: data.id,
    };

    changeStatus(updateData);
  };

  useEffect(() => {
    if (bookStatusChange?.modifiedCount) {
      toast.success("Change the status successfully");
    }
  }, [bookStatusChange?.modifiedCount]);

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {readingBooks?.message && (
        <>
          <h2 className="text-center text-2xl text-bold">
            {readingBooks.message}
          </h2>
        </>
      )}

      {readingBooks?.length > 0 &&
        readingBooks?.map((book: any) => (
          <div key={book._id} className="card shadow-xl">
            <figure className="w-full h-80">
              <img
                src={
                  book.image
                    ? book.image
                    : "http://dummyimage.com/212x100.png/dddddd/000000"
                }
                alt={book.title}
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Title: {book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre}</p>
              <p className="text-8 font-bold">
                Reading Status:{" "}
                {book.status === "reading-completed" ? (
                  <small className="text-green-500"> Finished Reading</small>
                ) : (
                  <small className="text-blue-500"> {book.status}</small>
                )}
              </p>
              {book.status === "read-soon" && (
                <select
                  onChange={(e) =>
                    handleReadingStatusChange({ e, id: book._id })
                  }
                >
                  <option>Change the reading status</option>
                  <option value="reading">Reading</option>
                </select>
              )}
              {book.status === "reading" && (
                <select
                  onChange={(e) =>
                    handleReadingStatusChange({ e, id: book._id })
                  }
                >
                  <option>Change the reading status</option>
                  <option value="reading-completed">Finished Reading</option>
                </select>
              )}
              {/* <button
            onClick={() => handleRemoveFromWishList(book._id)}
            className="btn btn-warning"
          >
            Remove from wishlist
          </button> */}
            </div>
          </div>
        ))}
    </div>
  );
};

export default CurrentlyReading;
