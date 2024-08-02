import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { socket } from "./socket";
import MainRoutes from "./routes/MainRoutes";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MainRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
