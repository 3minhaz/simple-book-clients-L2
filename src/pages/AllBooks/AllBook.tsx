import { useEffect } from "react";
import {
  useAddReadingListMutation,
  useAddWishListMutation,
} from "../../redux/hooks/api/apiSlice";
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
  const [readingList, { data: readListData }] = useAddReadingListMutation();

  const handleWishList = (id: string) => {
    const data = {
      email,
      bookId: id,
    };
    wishlist(data);
  };

  const handleReadSoon = (id: string) => {
    const data = {
      email,
      bookId: id,
    };
    readingList(data);
  };
  const handleReadStatus = (data: {
    e: React.ChangeEvent<HTMLSelectElement>;
    id: string;
  }) => {
    const status = data.e.target.value;
    const readingInfo = {
      email,
      bookInfo: {
        bookId: data.id,
        status: status,
      },
    };
    if (status === "read-soon") {
      const confirm = window.confirm(
        "Are you sure , you are changing the status"
      );
      if (confirm) {
        readingList(readingInfo);
      }
    }
  };

  useEffect(() => {
    if (wishlistData?.upsertedCount || wishlistData?.modifiedCount) {
      toast.success("Data added successfully");
    } else if (wishlistData?.message) {
      toast.error("Book already added to Wishlist");
    } else if (readListData?.upsertedCount || readListData?.modifiedCount) {
      toast.success("Book added to read-soon successfully");
    } else if (readListData?.message) {
      toast.error("Book already to added to ready soon");
    }
  }, [
    wishlistData?.upsertedCount,
    wishlistData?.modifiedCount,
    wishlistData?.message,
    readListData?.upsertedCount,
    readListData?.modifiedCount,
    readListData?.message,
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
          {/* <p
            onClick={() => {
              handleReadSoon(book._id);
            }}
            className="btn btn-accent"
          >
            Read Soon
          </p> */}
          <select
            onChange={(e) => handleReadStatus({ e, id: book._id })}
            className="select select-bordered w-full mt-2"
          >
            <option value="">Select Status</option>
            <option value="read-soon">Read soon</option>
            {/* <option value="reading">reading</option>
            <option value="finished">Finished</option> */}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AllBook;
