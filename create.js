import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import { responseLambda } from "./utils/responseLambda";

export const newMessage = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      messageId: uuid.v4(),
      content: data.content,
      createdDate: Date.now(),
      receiver: data.receiver,
    },
  };

  await dynamoDb.put(params);

  return responseLambda(params.item);
});