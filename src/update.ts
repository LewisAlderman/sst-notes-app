import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async(evt) => {
	const data = JSON.parse(evt.body);
	
	const params = {
		TableName: process.env.TABLE_NAME,
		Key: { userId: evt.requestContext.authorizer.iam.cognitoIdentity.identityId, noteId: evt.pathParameters.id },
		UpdateExpression: "set content = :content, attachment = :attachment",
		ExpressionAttributeValues: {
			":attachment": data.attachment || null,
			":content": data.content || null,
		},
		ReturnValues: "ALL_NEW"
	}

	await dynamoDb.update(params);

	return { status: true }
})