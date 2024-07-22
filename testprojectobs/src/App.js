import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./Component/User";
import { Provider } from "react-redux";
import userstore from "./Redux/Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import UserManagement from "./Component/UserManagement";

function App() {
  return (
    <Provider store={userstore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<User />} />
          {/* <Route path="/" element={<UserManagement />} /> */}
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right"></ToastContainer>
    </Provider>
  );
}

export default App;
