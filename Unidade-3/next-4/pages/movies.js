import { useState } from "react";
import styles from "../styles/movies.module.css"

export default function Movies({ data }) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = async () => {
        const res = await fetch(`http://www.omdbapi.com/?apikey=de1cc0e1&s=${searchQuery}`);
        const newData = await res.json();
        // Atualiza os resultados da pesquisa no estado data
        data.Search = newData.Search;
      };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.forms}>
                <input
                    type="text"
                    placeholder="Digite sua pesquisa (Isso pode demorar)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className={styles.searchButton} onClick={handleSearch}>
                    Pesquisar
                </button>
            </div>
            <div className={styles.moviesContainer}>
                {data.Search.map((m) => (
                    <div key={m.imdbID} className={styles.movieCard}>
                        <a
                            href={`https://www.imdb.com/title/${m.imdbID}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={m.Poster} alt={m.Title} />
                        </a>
                        <div className={styles.movieText}>
                            {m.Title} --- {m.Year}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { query } = context;
    const searchQuery = query.q || "bagdad";

    const res = await fetch(
        `http://www.omdbapi.com/?apikey=de1cc0e1&s=${searchQuery}`
    );
    const data = await res.json();

    return {
        props: {
            data,
        },
    };
}
