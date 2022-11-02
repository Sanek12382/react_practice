import React, { useState } from "react";
import style from "./header.module.css";

import { UserInfo } from "./UserInfo";
import { Link, useLocation } from "react-router-dom";
import {ToTodo} from "./Todo";
import {Gallery} from "./gallery";
const Header = () => {
  const { pathname } = useLocation();

  return (
    <div className={style.header}>
      {pathname !== "/" &&
      <Link to="/">
          <button className={style.butt} >Назад</button>
      </Link>}
      <UserInfo />
      <ToTodo/>
      <Gallery/>
    </div>
  );
};

export default Header;
