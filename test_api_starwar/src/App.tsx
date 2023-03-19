import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [data, setData] = useState<any>();
    const [isFetching, setIsFetching] = useState(false);
    const [urlPath, setUrlPath] = useState("");
    const [status, setStatus] = useState<number>();
    const [error, setError] = useState("");

    const baseUrl = "https://swapi.dev/api/";

    useEffect(() => {
        const fetchData = async () => {
            if (urlPath.length > 0) {
                try {
                    const response = await fetch(urlPath);
                    setIsFetching(false);
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

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsFetching(true);
        setError("");
        const btnName = event.currentTarget.name;
        switch (btnName) {
            case "btn1":
                setUrlPath(`${baseUrl}people/1/`);
                break;
            case "btn2":
                setUrlPath(`${baseUrl}planets/3/`);
                break;
            case "btn3":
                setUrlPath(`${baseUrl}starships/9/`);
                break;
            default:
                break;
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <div className="TopDiv">
                    <button className="TopDiv__button" onClick={handleClick} name="btn1">
                        people/1/
                    </button>
                    <button className="TopDiv__button" onClick={handleClick} name="btn2">
                        planets/3/
                    </button>
                    <button className="TopDiv__button" onClick={handleClick} name="btn3">
                        starships/9/
                    </button>
                </div>
                <p>isFetching: {isFetching ? "TRUE" : "FALSE"}</p>
                <p>status: {status}</p>
                <p>error: {error}</p>
                <p>name: {data?.name}</p>
                <p>{JSON.stringify(data)}</p>
            </header>
        </div>
    );
}

export default App;
