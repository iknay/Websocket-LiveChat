import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainRoutes from "./routes/MainRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MainRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
