import React, { memo, useCallback } from "react";
import { removePhoto } from "../../api/photosServises";
import { Button } from "../Button";
//import "../PageTodo/todo.css";
import style from "../../pages/PageGallery/photo.module.css";


export const Photo = memo(
    ({ setPhotoId, setEdited,  setLink, setTitle,  loadData, id, title, link, date }) => {
        const handleDelete = useCallback(async () => {
            const data = await removePhoto("photos", id);
            if (data.status < 400) {
                loadData();
            }
        }, []);

        const handleEdit = useCallback(() => {
            setPhotoId(id);
            setTitle(title);
            setLink(link);
            setEdited(true);

        }, [id, title, link]);

        return (
            <div className={style.app}>
                <img src={link}></img>
                <p className={style.btn}>{title}</p>
                <p>{date}</p>
                <Button text={"delete"} func={handleDelete} />
                <Button text={"Edit"} func={handleEdit} />
            </div>
        );
    }
);
