import { useAppSelector } from "../../../redux/hooks/useReduxHooks";
import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import Loader from "../../../components/Loader";

interface IProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: IProps) => {
  const { pathname } = useLocation();
  const { email, isLoading } = useAppSelector((state) => state.users);
  if (isLoading) {
    return <Loader></Loader>;
  }
  if (email) {
    return children;
  }
  return <Navigate to="/login" state={{ path: pathname }} />;
};

export default PrivateRoute;
