/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateBookMutation } from "../../redux/hooks/api/apiSlice";
import { useAppSelector } from "../../redux/hooks/useReduxHooks";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

type Inputs = {
  author: string;
  title: string;
  genre: string;
  publicationDate: string;
  image: string;
  email: string | null;
};

const AddNewBook = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const email = useAppSelector((state) => state.users.email);
  const [createBook, { data: newBook }] = useCreateBookMutation();

  const handleBookCreate: SubmitHandler<Inputs> = (data) => {
    data.email = email;
    createBook(data);
  };

  useEffect(() => {
    if (newBook?.insertedId) {
      reset();
      toast.success("Book created successfully");
    }
  }, [newBook?.insertedId]);

  return (
    <div className="flex justify-center items-center h-[600px] ">
      <div className="w-96 p-7">
        <h2 className="text-xl text-center font-bold uppercase mb-4">
          Added A New Book
        </h2>
        <form
          onSubmit={handleSubmit(handleBookCreate)}
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
              <span className="label-text">
                Publication Date : (ex: 12-31-2023)
              </span>
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
              {...register("image")}
            />
          </div>

          <input
            className="btn btn-neutral btn-active text-white"
            value="Add Book"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default AddNewBook;
