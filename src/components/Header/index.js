import React, { useState } from "react";
import style from "./header.module.css";

import { UserInfo } from "./UserInfo";
import { Link, useLocation } from "react-router-dom";
import {ToTodo} from "./Todo";
import {Gallery} from "./gallery";
import {ShowCase} from "./ShowCase"
import moment from "moment";
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
        <ShowCase/>
        <p className={style.time}>{moment().format('HH:mm ')}</p>/
    </div>
  );//bad code                  ^ right there ^ should have used set interval but no cus more urgent stuff needs doing
};

export default Header;
