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
    let time=0;
    let a;
    function setTime(){
        time=moment().format('h:mm:ss ');;
    }
    a=setInterval(setTime, 1000);
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
        <p>{time}</p>
    </div>
  );
};

export default Header;
