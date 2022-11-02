import React, { useContext } from "react";
import style from "../header.module.css";

import { Link } from "react-router-dom";
import { UserContext } from "../../../App";

export const Gallery = () => {
    let user = useContext(UserContext);


    return (
        <figure className={style.gallery}>
            <Link to="/gallery">
                <button className={style.butt} >Gallery</button>
            </Link>
        </figure>
    );
};
