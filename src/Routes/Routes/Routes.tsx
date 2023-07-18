import { createBrowserRouter } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Home from "../../pages/Home/Home";
import SignUp from "../../pages/SignUp/SignUp";
import AllBooks from "../../pages/AllBooks/AllBooks";
import BookDetails from "../../pages/BookDetails/BookDetails";
import EditBook from "../../pages/EditBook/EditBook";
import App from "../../App";
import AddNewBook from "../../pages/AddNewBook/AddNewBook";
import Wishlist from "../../pages/Wishlist/Wishlist";
import CurrentlyReading from "../../pages/CurrentlyReading/CurrentlyReading";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/all-books",
        element: <AllBooks />,
      },
      {
        path: "/books/:id",
        element: <BookDetails />,
      },
      {
        path: "/books/edit/:id",
        element: (
          <PrivateRoute>
            <EditBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-new-book",
        element: (
          <PrivateRoute>
            <AddNewBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        ),
      },
      {
        path: "/currently-reading",
        element: (
          <PrivateRoute>
            <CurrentlyReading />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
