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

    useEffect(() => {
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            setData(data)
        })
    }, [url]);

    return { data };
};

export default useScans;