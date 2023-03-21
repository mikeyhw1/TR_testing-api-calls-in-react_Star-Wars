// import { useState } from "react";

interface resultDisplayProp {
    data: { name: string };
    status: number;
    error: any;
    display: string;
    setDisplay: React.Dispatch<React.SetStateAction<string>>;
}

const ResultDisplay: React.FC<resultDisplayProp> = ({ data, status, error, display, setDisplay }) => {
    if (error) {
        setDisplay(String(error));
    } else {
        switch (status) {
            case 500:
                setDisplay("500: Internal Server Error");
                break;
            case 418:
                setDisplay("418: I'm a tea pot");
                break;
            case 200:
                if (data !== undefined) {
                    setDisplay(data?.name);
                } else {
                    setDisplay("data undefined");
                }
                break;
            default:
                setDisplay("Unknown status code");
                break;
        }
    }

    return (
        <div>
            <p>{display}</p>
        </div>
    );
};

export default ResultDisplay;
