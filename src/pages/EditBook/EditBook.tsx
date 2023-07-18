import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useGetSingleBooksQuery,
  useUpdateCommentMutation,
} from "../../redux/hooks/api/apiSlice";
import { toast } from "react-hot-toast";

type Inputs = {
  author: string;
  title: string;
  genre: string;
  publicationDate: string;
  image: string;
};

const EditBook = () => {
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<Inputs>();
  const { id } = useParams();

  const { data } = useGetSingleBooksQuery(id);
  //   console.log(data);
  //   const dispatch = useAppDispatch();
  const [updateData, { data: updateBookData }] = useUpdateCommentMutation();
  const handleLogin: SubmitHandler<Inputs> = (data) => {
    // dispatch(registerUser(data));
    // reset();
    const options = {
      id,
      data,
    };
    updateData(options);
    // if (isSuccess) {
    //   console.log("data updated successfully");
    // }
    // console.log(data);
  };

  useEffect(() => {
    if (updateBookData?.modifiedCount) {
      toast.success("Data update successfully");
      reset();
    }
  }, [updateBookData?.modifiedCount]);

  return (
    <div className="flex justify-center items-center h-[600px] ">
      <div className="w-96 p-7">
        <h2 className="text-xl text-center">Edit Books</h2>
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
              defaultValue={data.author}
              className="input input-bordered w-full max-w-xs"
              {...register("author")}
            />
            {/* {errors.author && (
              <p className="text-red-600">{errors.author?.message}</p>
            )} */}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              defaultValue={data.title}
              className="input input-bordered w-full max-w-xs"
              {...register("title")}
            />
            {/* {errors.title && (
              <p className="text-red-600">{errors.title?.message}</p>
            )} */}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Genre</span>
            </label>
            <input
              type="text"
              defaultValue={data.genre}
              className="input input-bordered w-full max-w-xs"
              {...register("genre")}
            />
            {/* {errors.title && (
              <p className="text-red-600">{errors.title?.message}</p>
            )} */}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Publication Date</span>
            </label>
            <input
              type="text"
              defaultValue={data.publicationDate}
              className="input input-bordered w-full max-w-xs"
              {...register("publicationDate", {
                pattern:
                  /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(19|20)\d{2}$/,
              })}
            />
            {errors.publicationDate && (
              <p className="text-red-500">
                Please follow the format: month-date-year
              </p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              type="text"
              defaultValue={data.image}
              className="input input-bordered w-full max-w-xs"
              {...register("image")}
            />
          </div>

          <input
            className="btn btn-neutral btn-active text-white"
            value="Update Book"
            type="submit"
          />
        </form>

        {/* <div className="divider">OR</div> */}
        {/* <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button> */}
      </div>
    </div>
  );
};

export default EditBook;
