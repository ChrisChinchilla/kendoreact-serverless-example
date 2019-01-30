"use strict";

const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

const response = body => ({
  // return the CORS headers in response, without that it wouldn't work from the browser
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
  statusCode: 200,
  body,
});

module.exports.getPomodoros = async (event, context) => {
  // Fetch all pomodoros from DynamoDB table
  const pomodoros = await documentClient
    .scan({ TableName: "pomodoros" })
    .promise();

  return response(JSON.stringify({ pomodoros }));
};

module.exports.postPomodoro = async (event, context) => {
  const Item = JSON.parse(event.body);
  await documentClient
    .put({
      TableName: "pomodoros",
      Item,
    })
    .promise();

  return response(JSON.stringify({ Item }));
};
