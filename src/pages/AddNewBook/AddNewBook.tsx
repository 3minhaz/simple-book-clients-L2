import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import {
  useGetSingleBooksQuery,
  useUpdateCommentMutation,
} from "../../redux/hooks/api/apiSlice";

type Inputs = {
  author: string;
  title: string;
  genre: string;
  publicationDate: string;
  image: string;
};

const AddNewBook = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  //   const { data, isLoading } = useGetSingleBooksQuery(id);
  //   console.log(data);
  //   const dispatch = useAppDispatch();
  //   const [updateData, { isLoading: UpdteLoading, isError, isSuccess }] =
  // useUpdateCommentMutation();
  const handleLogin: SubmitHandler<Inputs> = (data) => {
    // dispatch(registerUser(data));
    // reset();
    // const options = {
    //   id,
    //   data,
    // };
    // if (isSuccess) {
    //   console.log("data updated successfully");
    // }
    // console.log(data);
  };
  return (
    <div className="flex justify-center items-center h-[600px] ">
      <div className="w-96 p-7">
        <h2 className="text-xl text-center font-bold">Added A New Book</h2>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="grid gap-6 grid-cols-1"
        >
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Author</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              {...register("author", {
                required: "Author is required",
              })}
            />
            {errors.author && (
              <p className="text-red-600">{errors.author?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              {...register("title", {
                required: "Title is required",
              })}
            />
            {errors.title && (
              <p className="text-red-600">{errors.title?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Genre</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              {...register("genre", {
                required: "Genre is required",
              })}
            />
            {errors.genre && (
              <p className="text-red-600">{errors.genre?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Publication Date</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              {...register("publicationDate", {
                required: "Publication Date is required",
                pattern:
                  /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(19|20)\d{2}$/,
              })}
            />
            {errors.publicationDate && (
              <p className="text-red-500">
                Please follow the format: month-date-year & Publication Date is
                required
              </p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              {...register("image", {
                required: "Image is required",
              })}
            />
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}
          </div>

          <input
            className="btn btn-neutral btn-active text-white"
            value="Add Book"
            type="submit"
          />
        </form>

        {/* <div className="divider">OR</div> */}
        {/* <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button> */}
      </div>
    </div>
  );
};

export default AddNewBook;
