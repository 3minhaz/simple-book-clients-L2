import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes/Routes.tsx";
import { useEffect } from "react";
import { useAppDispatch } from "./redux/hooks/useReduxHooks.ts";
import { setLoading, setUser } from "./redux/users/user.ts";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./firebase/firebase.ts";
import Main from "./layout/Main.tsx";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);

  return (
    <div className="max-w-[1400px] mx-auto">
      <Main></Main>
      {/* <RouterProvider router={router} /> */}
    </div>
  );
}

export default App;
