import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "../../api/axios";

export default function SearchPage() {
    // console.log("useLocation()", useLocation());

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    let query = useQuery();
    const searchTerm = query.get("q");
    // console.log("searchTerm", searchTerm);

    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            fetchSearchMovie(searchTerm);
        }
    }, [searchTerm]);

    const fetchSearchMovie = async (searchTerm) => {
        try {
            const request = await axios.get(
                `/search/multi?include_adult=false&query=${searchTerm}`
            );
            console.log(request);
            setSearchResults(request.data.results);
        } catch (error) {
            console.log("error", error);
        }
    };

    return <div>index</div>;
}
