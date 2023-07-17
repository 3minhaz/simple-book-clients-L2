import { useEffect } from "react";
import { useAddWishListMutation } from "../../redux/hooks/api/apiSlice";
import { useAppSelector } from "../../redux/hooks/useReduxHooks";
import { Book } from "./AllBooks";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

type IProps = {
  book: Book;
};

const AllBook = ({ book }: IProps) => {
  const email = useAppSelector((state) => state.users.email);

  const [wishlist, { data: wishlistData }] = useAddWishListMutation();
  const handleWishList = (id: string) => {
    const data = {
      email,
      bookId: id,
    };
    wishlist(data);
  };
  useEffect(() => {
    if (wishlistData?.upsertedCount || wishlistData?.modifiedCount) {
      toast.success("Data added successfully");
    } else if (wishlistData?.message) {
      toast.error("Book already added to Wishlist");
    }
  }, [
    wishlistData?.upsertedCount,
    wishlistData?.modifiedCount,
    wishlistData?.message,
  ]);

  return (
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
        <p>Publication Date: {book.publicationDate}</p>
        <div>
          <p className="btn btn-primary mr-2">
            <Link to={`/books/${book._id}`}>Details</Link>
          </p>
          <p
            onClick={() => {
              handleWishList(book._id);
            }}
            className="btn btn-warning mr-2"
          >
            Add to Wishlist
          </p>
          <p className="btn btn-accent">Read Soon</p>
        </div>
        {/* <div className="card-actions justify-end">
        <div className="badge badge-outline">Fashion</div>
        <div className="badge badge-outline">Products</div>
      </div> */}
      </div>
    </div>
  );
};

export default AllBook;
