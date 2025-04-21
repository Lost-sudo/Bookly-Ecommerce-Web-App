import axios from "axios";

const BASE_URL = "http://localhost:8000/api/books/";

export const fetchAllBooks = async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
};

export const getBooksByGenre = async (mainGenre, subGenre) => {
    const res = await axios.get(BASE_URL, {
        params: {
            genre: mainGenre,
            sub_genre: subGenre,
        },
    });
    return res.data;
};

