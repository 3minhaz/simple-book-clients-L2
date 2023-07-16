import { useAppSelector } from "../../../redux/hooks/useReduxHooks";
import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import Loader from "../../../components/Loader";

interface IProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: IProps) => {
  const { email, isLoading } = useAppSelector((state) => state.users);
  const location = useLocation();

  if (isLoading) {
    return <Loader></Loader>;
  }
  if (!email && !isLoading) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default PrivateRoute;
