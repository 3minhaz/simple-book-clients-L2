import { useParams } from "react-router-dom";
import {
  useGetSingleBooksQuery,
  usePostCommentMutation,
} from "../../redux/hooks/api/apiSlice";
import Loader from "../../components/Loader";
import {
  useAppDispatch,
  useAppSelector,
} from "../../redux/hooks/useReduxHooks";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  comment: string;
};

const BookDetails = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetSingleBooksQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const [postComment, { isLoading: loadingPost, isError, isSuccess }] =
    usePostCommentMutation();
  const user = useAppSelector((state) => state.users);

  const handleComment: SubmitHandler<Inputs> = async (data) => {
    const options = {
      id,
      data: { comment: data.comment, user: user.email },
    };

    await postComment(options);
    if (isSuccess) {
      reset();
    }
  };
  const verifiedBookUser = data?.email === user?.email;
  console.log("verifiedBookUser", verifiedBookUser);
  // console.log("data?.email", data?.email);
  // console.log("user?.email", user?.email);
  // const { image, title, author, genre, publicationDate } = data;

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
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-danger">Edit</button>
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
        {data?.comments?.map((comment: any) => (
          <div className="flex gap-4 mt-2">
            <h2>User: {comment.email}</h2>
            <h2>comment: {comment.comment}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookDetails;
