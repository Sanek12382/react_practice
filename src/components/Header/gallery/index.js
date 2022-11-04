import React, { useContext } from "react";
import style from "../header.module.css";

import { Link } from "react-router-dom";


export const Gallery = () => {



    return (
        <figure className={style.gallery}>
            <Link to="/gallery">
                <button className={style.butt} >Gallery</button>
            </Link>
        </figure>
    );
};
