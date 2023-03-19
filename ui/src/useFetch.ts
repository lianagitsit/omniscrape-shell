import { useEffect, useState } from "react";

type ApiData = {
    message?: string;
}

type FetchRes = {
    data: ApiData,
    loading?: boolean,
    error?: string
}

const useFetch = (url: string): FetchRes => {
    const [data, setdata] = useState({});
    const [loading, setloading] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const [error, seterror] = useState("");

    useEffect(() => {
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            seterror(error)
            setdata(data)
            setloading(false)
            setLoaded(true)
        })
    }, [url]);

    return { data, loading, error };
};

export default useFetch;