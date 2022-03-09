import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const deleteMessage = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      messageId: event.pathParameters.id,
    },
  };

  await dynamoDb.delete(params);

  return { status: true };
});


