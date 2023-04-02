import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import requests from "../api/requests";

export default function Banner() {
    const [movie, setMovie] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // 현재 상영중인 영화 정보를 가져오기 (여러 영화)
        const request = await axios.get(requests.fetchNowPlaying);
        // console.log(request);
        // 여러 영화 중 영화 하나의 ID를 가져오기
        const movieId =
            request.data.results[
                Math.floor(Math.random() * request.data.results.length)
            ].id;

        // 특정 영화의 더 상세한 정보를 가져오기(비디오 정보도 포함)
        const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
            params: { append_to_response: "videos" },
        });
        setMovie(movieDetail);
    };

    return <div></div>;
}
