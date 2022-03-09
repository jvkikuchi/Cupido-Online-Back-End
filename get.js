import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const getMessage = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: "123",
      messageId: event.pathParameters.id,
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  // Return the retrieved item
  return result.Item;
});