import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { useGetAllBooksQuery } from "../../redux/hooks/api/apiSlice";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useAppDispatch,
  useAppSelector,
} from "../../redux/hooks/useReduxHooks";
import { setGenre, setSearchTerm, setYear } from "../../redux/books/bookSlice";
import { toast } from "react-hot-toast";

type Book = {
  _id: string;
  author: string;
  title: string;
  genre: string;
  publicationDate: string;
  image: string;
};

const AllBooks = () => {
  type Inputs = {
    searchTerm?: string;
    publicationYear?: number;
    genre?: string;
  };

  const { register, handleSubmit, reset } = useForm<Inputs>();

  const dispatch = useAppDispatch();
  const [filterData, setFilteredData] = useState([]);
  const { genre, year } = useAppSelector((state) => state.book);

  const data = useAppSelector((state) => state.book);

  const handleYearChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setYear(e.target.value));
  };
  const handleGenreChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setGenre(e.target.value));
  };

  const { data: allBooks, isLoading, refetch } = useGetAllBooksQuery(data);
  useEffect(() => {
    // const filterData = [];
    if (genre) {
      const filteredByGenre = allBooks.filter(
        (book: Book) => book.genre.toLowerCase() === genre.toLowerCase()
      );
      // filterData.push(...filteredByGenre);
      setFilteredData(filteredByGenre);
      if (filteredByGenre.length === 0 && filterData.length === 0) {
        toast.error("No result found", {
          duration: 5000,
        });
      }
    }
    if (year) {
      const filteredByYear = allBooks.filter((book: Book) => {
        const publicationYear = book.publicationDate.split("-")[2];
        return publicationYear === year;
      });
      setFilteredData(filteredByYear);
      if (filteredByYear.length === 0 && filterData.length === 0) {
        toast.error("No result found", {
          duration: 5000,
        });
      }
      // filterData.push(...filteredByYear);
      // console.log(filteredByYear, "filtered by year");
    }
    if (genre && year) {
      const filteredByGenreAndYear = allBooks.filter((book: Book) => {
        const publicationYear = book.publicationDate.split("-")[2];
        const publicationGenre = book.genre.toLowerCase();
        return (
          publicationYear === year && publicationGenre === genre.toLowerCase()
        );
      });
      // filterData.push(...filteredByGenreAndYear);
      if (filteredByGenreAndYear.length === 0 && filterData.length === 0) {
        toast.error("No result found", {
          duration: 5000,
        });
      }
      setFilteredData(filteredByGenreAndYear);
    }
  }, [genre, year]);

  console.log("filterData", filterData);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    dispatch(setSearchTerm(data.searchTerm));
    await refetch();
    reset();
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <Link to="/add-new-book">
        <button className="btn btn-info mb-14">Add A New Book</button>
      </Link>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center mb-14"
        >
          <input
            type="text"
            {...register("searchTerm")}
            placeholder="Search Here"
            className="input input-bordered w-full mr-6"
          />
          <input className="btn btn-primary" type="submit" value="Search" />
        </form>
        {/* <select className="mr-5 select select-bordered max-w-xs">
          <option disabled selected>
            Select
          </option>
          <option>Genre</option>
          <option>Publication Year</option>
        </select> */}

        <select
          // className="mr-5 select select-bordered max-w-xs"
          // {...register("genre")}
          onChange={handleGenreChange}
          name="genre"
        >
          <option value="">All Genres</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Historical Fiction">Historical Fiction</option>
          <option value="Dystopian">Dystopian</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Mystery">Mystery</option>
          {/* Add more genres as needed */}
        </select>
        <select
          // className="mr-5 select select-bordered max-w-xs"
          // {...register("publicationYear")}
          onChange={handleYearChange}
          name="publicationYear"
        >
          <option value="">All Years</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2009">2009</option>
          <option value="1993">1993</option>
          {/* Add more publication years as needed */}
        </select>
      </div>
      <div className="mt-18 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filterData.length > 0
          ? filterData?.map((book: Book) => (
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
                  <h2 className="card-title">
                    Title: {book.title}
                    {/* <div className="badge badge-secondary">NEW</div> */}
                  </h2>
                  <p>Author: {book.author}</p>
                  <p>Genre: {book.genre}</p>
                  <p>Publication Date: {book.publicationDate}</p>
                  <p className="btn btn-primary">
                    <Link to={`/books/${book._id}`}>Details</Link>
                  </p>
                  {/* <div className="card-actions justify-end">
                <div className="badge badge-outline">Fashion</div>
                <div className="badge badge-outline">Products</div>
              </div> */}
                </div>
              </div>
            ))
          : allBooks?.map((book: Book) => (
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
                  <h2 className="card-title">
                    Title: {book.title}
                    {/* <div className="badge badge-secondary">NEW</div> */}
                  </h2>
                  <p>Author: {book.author}</p>
                  <p>Genre: {book.genre}</p>
                  <p>Publication Date: {book.publicationDate}</p>
                  <p className="btn btn-primary">
                    <Link to={`/books/${book._id}`}>Details</Link>
                  </p>
                  {/* <div className="card-actions justify-end">
                <div className="badge badge-outline">Fashion</div>
                <div className="badge badge-outline">Products</div>
              </div> */}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default AllBooks;
