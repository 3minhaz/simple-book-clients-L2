import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import Login from "../../pages/Login/Login";
import Home from "../../pages/Home/Home";
import SignUp from "../../pages/SignUp/SignUp";
import AllBooks from "../../pages/AllBooks/AllBooks";
import BookDetails from "../../pages/BookDetails/BookDetails";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import EditBook from "../../pages/EditBook/EditBook";
import App from "../../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
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
            <EditBook></EditBook>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
