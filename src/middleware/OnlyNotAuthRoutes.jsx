import React , {useEffect} from "react";
import { useSelector } from "react-redux";
import { useSearchParams, useNavigate, Outlet } from "react-router-dom";
const OnlyNotAuthRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [searchParams, _] = useSearchParams();
  const next = searchParams.get("next") || "/";
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate(next);
    }
  }, []);
  return <Outlet/>
};

export default OnlyNotAuthRoutes;
