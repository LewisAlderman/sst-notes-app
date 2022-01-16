import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async(evt) => {
	const params = {
		TableName: process.env.TABLE_NAME,
		Key: { 
			userId: evt.requestContext.authorizer.iam.cognitoIdentity.identityId, 
			// noteId: evt.pathParameters.id
		},
	}

	const result = await dynamoDb.get(params);
	if (!result.Item) throw new Error("Could not find note");

	return result.Item;
})