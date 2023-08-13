const AWS = require('aws-sdk');
const util = require('util');

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.lambdaHandler = async (event, context) => {
    // console.log('Event:', JSON.stringify(event, null, 1));
    const body = JSON.parse(event.body)
    console.log("errrrr", body)
    // if (!userId) {
    //     console.error('User ID (sub) not available');
    //     return {
    //         statusCode: 400,
    //         body: JSON.stringify('User ID not available')
    //     };
    // }

    const newItem = {
        ID: Date.now(),
        ...body,
        dietician: {
            _id: null,
            invite_status: null,
            invite_code: null,
            joining_date: null
        },
        isActive: true,
        height: null,
        weight: null,
        age: null, // TODO - calculate age based on timestamp
        food_preferences: {
            allergies: [],
            type: null,
        },
    };
    const TableName = "collection";

    const putParams = {
        TableName: TableName,
        Item: newItem
    };

    // Promisify the DynamoDB put operation
    const putItem = util.promisify(dynamodb.put.bind(dynamodb));

    try {
        await putItem(putParams);
        return {
            statusCode: 200,
            body: JSON.stringify('Item created successfully')
        };
    } catch (error) {
        console.error('Error creating item:', error);
        return {
            statusCode: 500,
            body: JSON.stringify('Error creating item')
        };
    }
};


