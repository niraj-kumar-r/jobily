import { useState, useEffect } from "react";
import axios from "axios";
import { REACT_APP_RAPID_API_KEY } from "react-native-dotenv";
import exampleResponse from "../constants/exampleResponse";

const rapidApiKey = REACT_APP_RAPID_API_KEY;
console.log(rapidApiKey);
// sometimes it doesn't load if not referenced soon, that's why it's here

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: "GET",
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: { ...query },

        headers: {
            "X-RapidAPI-Key": rapidApiKey,
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);
            console.log(response.data);
            // const response = exampleResponse;
            setData(response.data);
            setIsLoading(false);
        } catch (err) {
            setError(err);
            alert(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    };

    return { data, isLoading, error, refetch };
};

export default useFetch;
