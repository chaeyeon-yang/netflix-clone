import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "../../api/axios";
import { useDebounce } from "../../hooks/useDebounce";
import "./SearchPage.css";

export default function SearchPage() {
    // console.log("useLocation()", useLocation());

    const navigate = useNavigate();

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    let query = useQuery();
    const searchTerm = query.get("q");
    // console.log("searchTerm", searchTerm);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (debouncedSearchTerm) {
            fetchSearchMovie(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

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

    const renderSearchResults = () => {
        return searchResults.length > 0 ? (
            <section className="search-container">
                {searchResults.map((movie) => {
                    if (
                        movie.backdrop_path !== null &&
                        movie.media_type != "person"
                    ) {
                        const movieImageUrl =
                            "https://image.tmdb.org/t/p/w500" +
                            movie.backdrop_path;

                        return (
                            <div className="movie" key={movie.id}>
                                <div
                                    className="movie__column-poster"
                                    onClick={() => navigate(`/${movie.id}`)}
                                >
                                    <img
                                        src={movieImageUrl}
                                        alt="movie"
                                        className="movie__poster"
                                    />
                                </div>
                            </div>
                        );
                    }
                })}
            </section>
        ) : (
            <section className="no-results">
                <div className="no-results__text">
                    <p>
                        찾고자하는 검색어 "{debouncedSearchTerm}"에 맞는 영화가
                        없습니다.
                    </p>
                </div>
            </section>
        );
    };
    return renderSearchResults();
}
