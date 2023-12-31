import { Link, useNavigate } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux/hooks/useReduxHooks";
import { signOut } from "firebase/auth";
import auth from "../../../firebase/firebase";
import { setUser } from "../../../redux/users/user";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.users.email);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(setUser(null));
    });
  };

  return (
    <div className="navbar flex justify-between">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/all-books">All Books</Link>
            </li>
            {!user && (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Sign up</Link>
                </li>
              </>
            )}{" "}
            {user && (
              // <li onClick={() => handleLogout()}>
              //   <Link to="/login">Logout</Link>
              // </li>
              <>
                <button onClick={() => navigate("/wishlist")} className="mr-4">
                  Wishlist
                </button>
                <button
                  onClick={() => navigate("/currently-reading")}
                  className="mr-4"
                >
                  Currently Reading
                </button>
                <button
                  onClick={() => navigate("/add-new-book")}
                  className="mr-4"
                >
                  Add New Book
                </button>
                <button className="mr-4">{user}</button>
                <button onClick={() => handleLogout()}>logout</button>
              </>
            )}
          </ul>
        </div>
        <Link to="/">Books Center</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/all-books">All Books</Link>
          </li>
          {!user && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign up</Link>
              </li>
            </>
          )}{" "}
          {user && (
            // <li onClick={() => handleLogout()}>
            //   <Link to="/login">Logout</Link>
            // </li>
            <>
              <button onClick={() => navigate("/wishlist")} className="mr-4">
                Wishlist
              </button>
              <button
                onClick={() => navigate("/currently-reading")}
                className="mr-4"
              >
                Currently Reading
              </button>
              <button
                onClick={() => navigate("/add-new-book")}
                className="mr-4"
              >
                Add New Book
              </button>
              <button className="mr-4">{user}</button>
              <button onClick={() => handleLogout()}>logout</button>
            </>
          )}
        </ul>
      </div>
      {/* <div className="navbar-end">
        <a className="btn">Button</a>
      </div> */}
    </div>
  );
};

export default Navbar;
