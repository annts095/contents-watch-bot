type Response = {
    statusCode: number;
    body: string;
};

export const lambdaHandler = async (): Promise<Response> => {
    try {
        const targetUrlArrayJson = process.env.TARGET_URL;
        const targetWord = process.env.TARGET_WORD;
        const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

        if (targetUrlArrayJson === undefined || targetWord === undefined || slackWebhookUrl === undefined) {
            throw new Error('TARGET_URL or TARGET_WORD or slackWebhookUrl is not defined');
        }

        const targetUrlArray = JSON.parse(targetUrlArrayJson) as string[];

        targetUrlArray.forEach(async (targetUrl) => {
            const response = await fetch(targetUrl);

            const responseDom = await response.text();
            if (responseDom.includes(targetWord)) {
                const res = await fetch(slackWebhookUrl, {
                    method: 'POST',
                    body: JSON.stringify({
                        text: `I found the target!🕵️\n<${targetUrl}|Open in web>`,
                    }),
                });
                if (!res.ok) {
                    console.error('slack post error');
                }
            } else {
                console.log('not found target word');
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'success',
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
