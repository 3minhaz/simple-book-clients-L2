import React, { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks/useReduxHooks";
import {
  useGetWishListBookQuery,
  useRemoveFromWishListMutation,
} from "../../redux/hooks/api/apiSlice";
import Loader from "../../components/Loader";
import { Book } from "../AllBooks/AllBooks";
import { toast } from "react-hot-toast";

const Wishlist = () => {
  const email = useAppSelector((state) => state.users.email);
  // console.log(email, "..");
  const { data: books, isLoading } = useGetWishListBookQuery(email, {
    refetchOnMountOrArgChange: true,
  });
  const [removeWishlist, { data: removeWishList }] =
    useRemoveFromWishListMutation();

  // console.log(data);

  const handleRemoveFromWishList = (id: string) => {
    removeWishlist({ id, email });
  };
  useEffect(() => {
    if (removeWishList?.modifiedCount) {
      toast.success("successfully remove from wishlist");
    }
  }, [removeWishList?.modifiedCount]);

  if (isLoading) {
    return <Loader></Loader>;
  }
  console.log(removeWishList);
  return (
    <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {books?.length === 0 && (
        <>
          <h2 className="text-center text-2xl text-bold">
            Your wishlist is empty
          </h2>
        </>
      )}
      {books?.map((book: Book) => (
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
            <button
              onClick={() => handleRemoveFromWishList(book._id)}
              className="btn btn-warning"
            >
              Remove from wishlist
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
