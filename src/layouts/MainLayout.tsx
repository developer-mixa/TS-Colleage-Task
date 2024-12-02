import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../store";
import checkToken from "../utils/checkToken";


const MainLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    checkToken().then((isValid) => {
      if (isValid) {
        dispatch(login());
      } else {
        dispatch(logout());
      }
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <div>Загрузка...</div>
  ) : (
    <main>
      <Outlet />
    </main>
  );
};

export default MainLayout;
