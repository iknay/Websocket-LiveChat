import { PAGE_ROUTES } from "../routings/routings";
import { Routes, Route } from "react-router-dom";
import Chatroom from "../components/pages/Chatroom";
import Home from "../components/pages/Home";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={PAGE_ROUTES.CHATROOM} element={<Chatroom />} />
    </Routes>
  );
};

export default MainRoutes;
