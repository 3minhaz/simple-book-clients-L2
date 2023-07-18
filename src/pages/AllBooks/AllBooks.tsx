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
import AllBook from "./AllBook";

export type Book = {
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

  const {
    data: allBooks,
    isLoading,
    refetch,
  } = useGetAllBooksQuery(data, {
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    // const filterData = [];
    if (genre) {
      const filteredByGenre = allBooks?.filter(
        (book: Book) => book.genre.toLowerCase() === genre.toLowerCase()
      );
      // filterData.push(...filteredByGenre);
      setFilteredData(filteredByGenre);
      if (filteredByGenre?.length === 0) {
        toast.error("No result found", {
          duration: 5000,
        });
      }
    }
    if (year) {
      const filteredByYear = allBooks?.filter((book: Book) => {
        const publicationYear = book.publicationDate.split("-")[2];
        return publicationYear === year;
      });
      setFilteredData(filteredByYear);
      if (filteredByYear?.length === 0) {
        toast.error("No result found", {
          duration: 5000,
        });
      }
      // filterData.push(...filteredByYear);
      // console.log(filteredByYear, "filtered by year");
    }
    if (genre && year) {
      const filteredByGenreAndYear = allBooks?.filter((book: Book) => {
        const publicationYear = book.publicationDate.split("-")[2];
        const publicationGenre = book.genre.toLowerCase();
        return (
          publicationYear === year && publicationGenre === genre.toLowerCase()
        );
      });
      // filterData.push(...filteredByGenreAndYear);
      if (filteredByGenreAndYear?.length === 0) {
        toast.error("No result found", {
          duration: 5000,
        });
      }
      setFilteredData(filteredByGenreAndYear);
    }
  }, [genre, year]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    dispatch(setSearchTerm(data.searchTerm));
    await refetch();
    reset();
  };

  const splitYear = allBooks?.map(
    (book: Book) => book.publicationDate.split("-")[2]
  );
  const uniqueYears = [...new Set(splitYear)];

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

        <select
          className="select select-bordered mr-4"
          onChange={handleGenreChange}
          name="genre"
        >
          {" "}
          <option value="">All Genres</option>
          {allBooks?.map((book: Book) => (
            <option key={book._id} value={book.genre}>
              {book.genre}
            </option>
          ))}
        </select>
        <select
          className="select select-bordered"
          onChange={handleYearChange}
          name="publicationYear"
        >
          <option value="">Publication Year</option>
          {(uniqueYears as string[])
            ?.sort()
            .map((year: string, index: number) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
        </select>
      </div>
      <div className="mt-18 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filterData?.length > 0
          ? filterData?.map((book: Book) => (
              <AllBook key={book._id} book={book}></AllBook>
            ))
          : allBooks?.map((book: Book) => (
              <AllBook key={book._id} book={book}></AllBook>
            ))}
      </div>
    </div>
  );
};

export default AllBooks;
