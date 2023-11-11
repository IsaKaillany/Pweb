import React, { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import styles from "../styles/movies2.module.css";

export default function Movies2() {
    const { data, error } = useSWR(
        `http://www.omdbapi.com/?apikey=de1cc0e1&s=brasil`,
        fetcher
    );

    if (error) return <div>Falha na requisição...</div>;
    if (!data) return <div>Carregando...</div>;

    return (
        <div>
            {data.Search.map((m) => (
                <MovieLink key={m.imdbID} movie={m} />
            ))}
        </div>
    );
}

async function fetcher(url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
}

function MovieLink({ movie }) {
    const router = useRouter();

    const handleClick = () => {
        router.push({
            pathname: "/details",
            query: { id: movie.imdbID },
        });
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.moviesContainer}>
                <div onClick={handleClick} style={{ cursor: "pointer" }}>
                    {movie.Title} --- {movie.Year}
                </div>
            </div>
        </div>
    );
}
