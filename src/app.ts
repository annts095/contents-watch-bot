type Response = {
    statusCode: number;
    body: string;
};

export const lambdaHandler = async (): Promise<Response> => {
    try {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'hello world',
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};
