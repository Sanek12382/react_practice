import React, {useCallback, useEffect, useState} from "react";
import { Button } from "../../components/Button";
import { Photo } from "../../components/Photo";
import { addPhoto, editPhoto, getPhoto } from "../../api/photosServises";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";


export const PagePhoto = () => {
    const gendate = new Date();

    let day = gendate.getDate();
    let month = gendate.getMonth() + 1;
    let year = gendate.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
    let date = `${day}-${month}-${year}`;

    
    const [photos, setPhotos] = useState([]);
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [error, setError] = useState("");
    const [edited, setEdited] = useState(false);
    const [photoId, setPhotoId] = useState(null);



    const loadData = useCallback(async () => {
        const data = await getPhoto("photos");
        if (data.status < 400) {
            const photos = await data.json();
            setPhotos(photos);
        }
    }, []);

    const heandleTitle = (event) => {
        setTitle(event.target.value);
    };

    const heandleLink = (event) => {
        setLink(event.target.value);
    };


    const creatPhoto = useCallback(async () => {

        const newPhoto = {
            id: uuid(),
            title,
            link,
            date
        };

        const data = await addPhoto("photos", newPhoto);
        if (data.status < 400) {
            loadData();
        } else {
            setError("Упс, что то пошло не так");
        }

    }, [title,link]);

    const editedPhoto = useCallback(async () => {

        const newPhoto = {
            id: photoId,
            title: title,
            link: link,
            date,
        };

        const data = await editPhoto("photos", photoId, newPhoto);
        if (data.status < 400) {
            loadData();
        }
    }, [photoId,title,link,date]);

    useEffect(() => {
        setError("");
    }, [title, link,  date]);

    useEffect(() => {
        loadData();
    }, [loadData]);
    return (
        <div>
            <Link to="./">
                <button>Home</button>
            </Link>
            <input type="text" value={title} placeholder={"Title"} onChange={heandleTitle} />
            <input type="text" value={link} placeholder={"Link"} onChange={heandleLink} />
            {error && <p style={{ color: "red" }}>{error}</p>}
            {edited ? (
                <Button text={"Edit photo"} func={editedPhoto} />
            ) : (
                <Button text={"Add photo"} func={creatPhoto} />
            )}
            <div>
                {photos.map(({ id, title, link, date }) => (
                    <Photo
                        setPhotoId={setPhotoId}
                        setEdited={setEdited}
                        setTitle={setTitle}
                        setLink={setLink}
                        loadData={loadData}
                        key={id}
                        id={id}
                        title={title}
                        link={link}
                        date={date}
                    />
                ))}
            </div>
        </div>
    );
};
