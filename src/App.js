import React, {createContext, useEffect, useState} from "react";
import { Routes, Route } from "react-router-dom";
import PageHome from "./pages/PageHome";
import { PageTodo } from "./pages/PageTodo";
import Header from "./components/Header";
import { PersonalAccount } from "./pages/PersonalAccount";
import { PagePhoto } from "./pages/PageGallery/index";

import style from "./App.css";
import { getUser } from "./api/userServises";
import { useFetch } from "./CustomHooks/useFetch";
import {PageShowCase
} from "./pages/PageShowCase";

export const UserContext = createContext({});

function App() {
  const [user, getUserInfo] = useFetch(getUser);



  useEffect(() => {
    getUserInfo("user", 1);
  }, []);

  const [pos, setPos]=useState({x:5, y:5});

  useEffect(() => {
    document.addEventListener("mousemove",MouseTrack);
  }, []);

    function MouseTrack(event){
    //console.log(event.clientX, event.clientY)
      setPos({x:event.clientX, y:event.clientY })


}
  return (
    <div className="app">
      <UserContext.Provider value={user}>
        <Header />
        <img style={{top: pos.y, left: pos.x, width: "60px", height: "60px", position:"absolute"  } }  src={"https://img.icons8.com/external-filled-line-andi-nur-abdillah/512/external-Rat-laboratory-(filled-line)-filled-line-andi-nur-abdillah.png"} />
        <Routes>

          <Route path="/" element={<PageHome />} />
          <Route path="/showCase" element={<PageShowCase />} />
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
