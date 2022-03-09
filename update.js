import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const editMessage = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: "123",
      messageId: event.pathParameters.id,
    },

    UpdateExpression: "SET content = :content",
    ExpressionAttributeValues: {
      ":content": data.content || null,
    },
    ReturnValues: "ALL_NEW",
  };

  await dynamoDb.update(params);

  return { status: true };
});