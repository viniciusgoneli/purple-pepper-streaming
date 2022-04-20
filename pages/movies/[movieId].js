import { useRouter } from "next/router";

export default function Movie(){
    const router = useRouter();
    const { movieId } = router.query;

    return <p>Movie: { movieId }</p>
}