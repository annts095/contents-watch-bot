type Response = {
    statusCode: number;
    body: string;
};

export const lambdaHandler = async (): Promise<Response> => {
    try {
        const targetUrl = process.env.TARGET_URL;
        const targetWord = process.env.TARGET_WORD;

        if (targetUrl === undefined || targetWord === undefined) {
            throw new Error('TARGET_URL or TARGET_WORD is not defined');
        }

        const response = await fetch(targetUrl);

        const responseDom = await response.text();
        if (!responseDom.includes(targetWord)) {
            console.log('not found target word');
        }

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
                message: err instanceof Error ? err.message : 'unknown error',
            }),
        };
    }
};
