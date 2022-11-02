import React, { createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PageHome from "./pages/PageHome";
import { PageTodo } from "./pages/PageTodo";
import Header from "./components/Header";
import { PersonalAccount } from "./pages/PersonalAccount";
import { PagePhoto } from "./pages/PageGallery/index";

import "./App.css";
import { getUser } from "./api/userServises";
import { useFetch } from "./CustomHooks/useFetch";

export const UserContext = createContext({});

function App() {
  const [user, getUserInfo] = useFetch(getUser);

  useEffect(() => {
    getUserInfo("user", 1);
  }, []);

  return (
    <div className="app">
      <UserContext.Provider value={user}>
        <Header />
        <Routes>
          <Route path="/" element={<PageHome />} />
          <Route path="/gallery" element={<PagePhoto />} />
          <Route path="todo" element={user && <PageTodo />} />
          <Route
            path="personal_account"
            element={user && <PersonalAccount />}
          />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}
export default App;
