import React, { useContext } from "react";import style from "../header.module.css";

import { Link } from "react-router-dom";


export const ShowCase = () => {



    return (
        <figure className={style.header_elemnt}>
            <Link to="/showCase">
                <button className={style.butt} >Show case</button>
            </Link>
        </figure>
    );
};
