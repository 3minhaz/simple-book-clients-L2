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
  console.log(isLoading, "isLoading");
  if (!email && !isLoading) {
    return <Navigate to="/login" state={{ path: pathname }} replace />;
  }
  return children;
};

export default PrivateRoute;
