import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async(evt) => {
	const params = {
		TableName: process.env.TABLE_NAME,
		Key: { userId: "123", noteId: evt.pathParameters.id },
	}

	await dynamoDb.delete(params);

	return { status: true };
})