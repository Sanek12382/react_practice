import React, { useContext } from "react";
import style from "../header.module.css";

import { Link } from "react-router-dom";
import { UserContext } from "../../../App";

export const ToTodo = () => {
    let user = useContext(UserContext);

    return (
        <figure className={style.header_elemnt}>
            <Link to="/todo">

                <button className={style.butt} >Todo list</button>
            </Link>

        </figure>
    );
};
