import React, {useCallback, useEffect, useState} from "react";
import { addPhoto, editPhoto, getPhoto } from "../../api/photosServises";
import { Link } from "react-router-dom";
import 'swiper/css';
import  { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import {Photo} from "../../components/Photo";

export const PageShowCase = () => {
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
            <div>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                >{photos.map(({ link }) => (

                    <SwiperSlide>
                    <img  src={link}/>
                    </SwiperSlide>
                ))}
                </Swiper>>
            </div>
        </div>
    );
};
