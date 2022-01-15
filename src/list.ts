import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async(evt) => {
	const params = {
		TableName: process.env.TABLE_NAME,
		KeyConditionExpression: "userId = :userId",
		ExpressionAttributeValues: {
			":userId": evt.requestContext.authorizer.iam.cognitoIdentity.identityId,
		}
	}

	const result = await dynamoDb.query(params);

	return result.Items;
})