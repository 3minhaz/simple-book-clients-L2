import { Link, useParams } from "react-router-dom";
import {
  useDeleteBookMutation,
  useGetSingleBooksQuery,
  usePostCommentMutation,
} from "../../redux/hooks/api/apiSlice";
import Loader from "../../components/Loader";
import { useAppSelector } from "../../redux/hooks/useReduxHooks";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect } from "react";

type Inputs = {
  comment: string;
};

const BookDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetSingleBooksQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const [postComment, { data: commentData }] = usePostCommentMutation();

  const [deleteBook, { data: deletedData }] = useDeleteBookMutation();

  const user = useAppSelector((state) => state.users);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const handleComment: SubmitHandler<Inputs> = (data) => {
    const options = {
      id,
      data: { comment: data.comment, user: user.email },
    };

    postComment(options);
  };
  // console.log("modified count ", commentData);
  useEffect(() => {
    if (commentData?.modifiedCount > 0) {
      toast.success("Successfully created!");
      reset();
    }
  }, [commentData?.modifiedCount]);

  const verifiedBookUser = data?.email === user?.email;

  const handleDelete = (id: string) => {
    const confirm = window.confirm(
      "Are you sure you want to to delete the book?"
    );
    if (confirm) {
      deleteBook(id);
    }
    // if (successDelete) {
    //   toast.success("Delete the book successfully");
    // }
  };

  useEffect(() => {
    if (deletedData?.deletedCount === 1) {
      toast.success("Deleted the book successfully!");
    }
  }, [deletedData?.deletedCount]);

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row">
          <img src={data?.image} className="w-96 rounded-lg shadow-2xl mr-16" />
          <div>
            <h1 className="text-5xl font-bold">Title: {data?.title}</h1>
            <h1 className="text-xl mt-4">Author: {data?.author}</h1>
            <h1 className="text-xl mt-4">Genre: {data?.genre}</h1>
            <h1 className="text-xl mt-4">
              Published Date: {data?.publicationDate}
            </h1>
            {verifiedBookUser && (
              <>
                <Link to={`/books/edit/${data._id}`}>
                  <button className="btn btn-primary">Edit</button>
                </Link>
                <button
                  onClick={() => handleDelete(data._id)}
                  className="btn mx-5 btn-warning"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="mt-12 w-full">
        {user.email && (
          <>
            <form onSubmit={handleSubmit(handleComment)}>
              <input
                type="text"
                placeholder="Type here"
                {...register("comment", {
                  required: "Comment is required",
                })}
                className="input input-bordered input-primary w-full mb-4"
              />
              {errors.comment && (
                <p className="text-red-500">Comment is required</p>
              )}
              <input
                className="btn btn-success"
                type="submit"
                value="Comment"
              />
            </form>
          </>
        )}
        <h2 className="text-2xl font-bold">User Reviews</h2>
        {data?.comments &&
          data?.comments?.map(
            (comment: { email: string; comment: string }, index: number) => (
              <div key={index} className="flex gap-4 mt-2">
                <h2>User: {comment.email}</h2>
                <h2>comment: {comment.comment}</h2>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default BookDetails;
