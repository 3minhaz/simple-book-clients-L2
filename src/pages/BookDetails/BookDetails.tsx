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
  const { data, isLoading } = useGetSingleBooksQuery(id);
  const [postComment, { isLoading: loadingPost, isError, isSuccess }] =
    usePostCommentMutation();
  const user = useAppSelector((state) => state.users);

  if (isLoading) {
    return <Loader></Loader>;
  }

  const handleComment: SubmitHandler<Inputs> = (data) => {
    const options = {
      id,
      data: { comment: data.comment },
    };

    postComment(options);
    if (isSuccess) {
      reset();
    }
  };
  const { image, title, author, genre, publicationDate } = data;

  return (
    <div>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row">
          <img src={image} className="w-96 rounded-lg shadow-2xl mr-16" />
          <div>
            <h1 className="text-5xl font-bold">Title: {title}</h1>
            <h1 className="text-xl mt-4">Author: {author}</h1>
            <h1 className="text-xl mt-4">Genre: {genre}</h1>
            <h1 className="text-xl mt-4">Published Date: {publicationDate}</h1>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
      <div className="mt-12 w-full">
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
          <input className="btn btn-success" type="submit" value="Comment" />
        </form>
      </div>
    </div>
  );
};

export default BookDetails;
