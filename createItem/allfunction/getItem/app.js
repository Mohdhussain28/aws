const AWS = require('aws-sdk')

const dynamodb = new AWS.DynamoDB.DocumentClient();


exports.lambdaHandler = async (event, context) => {
    // console.log('Event:', JSON.stringify(event, null, 1));
    const userId = event.requestContext.authorizer.claims.sub
    if (!userId) {
        console.error('User ID (sub) not available');
        return {
            statusCode: 400,
            body: JSON.stringify('User ID not available')
        };
    }

    const params = {
        TableName: "first",
        document: userId
    }

    try {
        const response = await dynamodb.scan(params).promise()
        return {
            statusCode: 201,
            body: JSON.stringify(response)
        }
    } catch (error) {
        console.error('Error ooo:', error)
        return {
            statusCode: 500,
            body: JSON.stringify('Error get item')
        };
    }
};
