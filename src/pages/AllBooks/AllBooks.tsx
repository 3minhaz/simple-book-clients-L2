import Loader from "../../components/Loader";
import { useGetAllBooksQuery } from "../../redux/hooks/api/apiSlice";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useAppDispatch,
  useAppSelector,
} from "../../redux/hooks/useReduxHooks";
import { setFilters, setSearchTerm } from "../../redux/books/bookSlice";

const AllBooks = () => {
  type Inputs = {
    searchTerm?: string;
    publicationYear?: number;
    genre?: string;
    // exampleRequired: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.book);
  // const data2 = useAppSelector((state) => state.book);

  const handleFilterChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    // const { name, value } = e.target;
    // const updatedData = { [name]: value };
    // console.log("checking", data.filters);
    // const filtersData = allBooks.filter((book) => {
    // console.log(data.filters);
    // if (data.filters?.genre!) {
    // console.log("inside genre");
    // console.log("checking", data.filters);
    // }
    // });
    // console.log("filters data", filtersData);
    // const filteredBooks = allBooks.filter((book: any) => {
    //   if (data.genre && book.genre.toLowerCase() !== data.genre.toLowerCase()) {
    //     return false;
    //   }
    //   if (
    //     data.publicationYear &&
    //     book.publicationDate.split("-")[2] !== data.publicationYear
    //   ) {
    //     return false;
    //   }
    //   return true;
    // });
    // Render the filtered book list
    // console.log(filteredBooks);
    // dispatch(setFilters({ [name]: data }));
    // await refetch();
  };

  const { data: allBooks, isLoading, refetch } = useGetAllBooksQuery(data);
  if (isLoading) {
    return <Loader></Loader>;
  }

  const handleSearch = (value: number[]) => {
    // dispatch(setPriceRange(value[0]));
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    dispatch(setSearchTerm(data.searchTerm));
    await refetch();
    reset();
  };

  // console.log("data books", allBooks);

  return (
    <div>
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
          onChange={handleFilterChange}
          name="genre"
        >
          <option value="">All Genres</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Mystery">Mystery</option>
          {/* Add more genres as needed */}
        </select>
        <select
          // className="mr-5 select select-bordered max-w-xs"
          // {...register("publicationYear")}
          onChange={handleFilterChange}
          name="publicationYear"
        >
          <option value="">All Years</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          {/* Add more publication years as needed */}
        </select>
      </div>
      <div className="mt-18 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {allBooks?.map((book: any) => (
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
