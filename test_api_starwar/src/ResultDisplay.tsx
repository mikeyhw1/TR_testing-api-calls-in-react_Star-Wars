interface resultDisplayProp {
    data: { name: string };
    status: number;
    error: any;
}

const ResultDisplay: React.FC<resultDisplayProp> = ({ data, status, error }) => {
    if (error) {
        return (
            <div>
                <p>{String(error)}</p>
            </div>
        );
    } else {
        switch (status) {
            case 500:
                return (
                    <div>
                        <p>{"500: Internal Server Error"}</p>
                    </div>
                );
            case 418:
                return (
                    <div>
                        <p>{"418: I'm a tea pot"}</p>
                    </div>
                );
            case 200:
                if (data !== undefined) {
                    return (
                        <div>
                            <p>{data?.name}</p>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <p>{"data undefined"}</p>
                        </div>
                    );
                }

            default:
                return (
                    <div>
                        <p>{"Unknown status code"}</p>
                    </div>
                );
        }
    }
};

export default ResultDisplay;
