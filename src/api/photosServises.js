import { sendRequest } from "./index";

const baseUrl = "http://localhost:5000";

export const getPhoto = (path) => {
    return sendRequest({ baseUrl, path });
};

export const addPhoto = (path, photo) => {
    return sendRequest({
        baseUrl,
        path,
        method: "POST",
        body: photo,
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const removePhoto = (path, id) => {
    const newPath = `${path}/${id}`;
    return sendRequest({ baseUrl, path: newPath, method: "DELETE" });
};

export const editPhoto = (path, id, editPhoto) => {
    const newPath = `${path}/${id}`;
    return sendRequest({
        baseUrl,
        path: newPath,
        method: "PUT",
        body: editPhoto,
        headers: {
            "Content-Type": "application/json",
        },
    });
};
