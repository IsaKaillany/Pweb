import { useRouter } from 'next/router';
import useSWR from 'swr';
import styles from '../styles/about.module.css';

const fetcher = async (url) => {
    const res = await fetch(url);
    const json = await res.json();
    return json;
};

export default function About() {
    const router = useRouter();
    const { id } = router.query;

    if (!id) {
        return <div>Carregando...</div>;
    }

    const url = `http://www.omdbapi.com/?apikey=de1cc0e1&i=${id}`;
    const { data, error } = useSWR(url, fetcher);

    if (error) return <div>Erro ao carregar o conteúdo...</div>;
    if (!data) return <div>Carregando...</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{data.Title}</h1>
            <img src={data.Poster} alt={data.Title} className={styles.poster} />
            <div className={styles.content}>
                <p>{data.Plot}</p>
                <p>Year: {data.Year}</p>
                <p>Director: {data.Director}</p>
            </div>
        </div>
    );
}