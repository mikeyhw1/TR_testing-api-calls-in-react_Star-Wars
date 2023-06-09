import React, { useEffect, useState } from "react";
import "./App.css";
import ResultDisplay from "./ResultDisplay";

export const baseUrl = "https://swapi.dev/api/";

function App() {
    const [data, setData] = useState<{ name: string }>({ name: "default" });
    const [isFetching, setIsFetching] = useState(true);
    const [status, setStatus] = useState<number>(0);
    const [error, setError] = useState<any>("");

    const urlPath = "people/1/";

    useEffect(() => {
        const fetchData = async () => {
            if (urlPath.length > 0) {
                try {
                    const response = await fetch(`${baseUrl}${urlPath}`);
                    setIsFetching(false);
                    console.log(`response.status: ${response.status}`);

                    if (response.status === 200) {
                        const json = await response.json();
                        setData(json);
                    }
                    setStatus(response.status);
                } catch (e: unknown) {
                    console.log(e);
                    setIsFetching(false);
                    if (isError(e)) {
                        setError(e.message);
                    }
                }
            } else {
                setIsFetching(false);
            }
        };
        fetchData();
    }, [urlPath]);

    function isError(e: unknown): e is Error {
        return (e as Error).message !== undefined;
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="TopDiv"></div>
                <p>isFetching: {isFetching ? "TRUE" : "FALSE"}</p>
                <p>status: {status}</p>
                <ResultDisplay data={data} status={status} error={error} />
            </header>
        </div>
    );
}

export default App;
