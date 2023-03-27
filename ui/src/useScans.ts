import { useEffect, useState } from "react";

type ApiData = {
    url?: string;
    deck?: string;
    price?: number;
    createdAt: string;
}[];

type FetchRes = {
    data: ApiData,
    loading?: boolean,
    error?: string
}

const useScans = (url: string): FetchRes => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loaded, setLoaded] = useState(false);
    // const [error, seterror] = useState("");

    useEffect(() => {
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            // setError(error)
            setData(data)
            setLoading(false)
            // setLoaded(true)
        })
    }, [url]);

    return { data, loading };
};

export default useScans;